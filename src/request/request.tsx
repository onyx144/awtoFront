import axios, { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';

const BASE_URL = 'http://192.168.31.74:3001';
const TOKEN_KEY = 'jwtToken';
const TOKEN_EXPIRY_KEY = 'jwtTokenExpiry';
const TOKEN_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 1 неделя
const ROLE_KEY = 'user_role';

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

const saveRole = (role: string, rememberMe: boolean) => {
  localStorage.setItem(ROLE_KEY, role);
  if (!rememberMe) {
    sessionStorage.setItem(ROLE_KEY, role);
  }
};

const getRole = (): string | null => {
  return localStorage.getItem(ROLE_KEY) || sessionStorage.getItem(ROLE_KEY);
};

const removeRole = () => {
  localStorage.removeItem(ROLE_KEY);
  sessionStorage.removeItem(ROLE_KEY);
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

  const fullUrl = `${BASE_URL}${url}`;

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(fullUrl, axiosConfig);
    case 'post':
      return axios.post(fullUrl, data, axiosConfig);
    case 'put':
      return axios.put(fullUrl, data, axiosConfig);
    case 'delete':
      return axios.delete(fullUrl, axiosConfig);
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
};

export { saveRole , getRole , removeRole , saveToken, getToken, removeToken, useAuthInterceptor, request };
