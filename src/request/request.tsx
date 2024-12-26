import axios, { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';

const TOKEN_KEY = 'jwtToken';
const TOKEN_EXPIRY_KEY = 'jwtTokenExpiry';
const TOKEN_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 1 неделя

const saveToken = (token: string, rememberMe: boolean) => {
  localStorage.setItem(TOKEN_KEY, token);
  if (rememberMe) {
    const expiryDate = new Date().getTime() + TOKEN_EXPIRY_TIME;
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryDate.toString());
  }
};

const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiryDate = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (token && expiryDate) {
    const now = new Date().getTime();
    if (now > parseInt(expiryDate, 10)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
      return null;
    }
  }
  return token;
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

const useAuthInterceptor = () => {
  useEffect(() => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const interceptor = axios.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);
};

const request = async (method: string, url: string, data?: any, config?: AxiosRequestConfig) => {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const axiosConfig = { ...config, headers };

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, axiosConfig);
    case 'post':
      return axios.post(url, data, axiosConfig);
    case 'put':
      return axios.put(url, data, axiosConfig);
    case 'delete':
      return axios.delete(url, axiosConfig);
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
};

export { saveToken, getToken, removeToken, useAuthInterceptor, request };
