import axios, { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';

const BASE_URL = 'http://192.168.31.74:3001';
const TOKEN_KEY = 'jwtToken';
const TOKEN_EXPIRY_KEY = 'jwtTokenExpiry';
const TOKEN_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 1 неделя
const ROLE_KEY = 'user_role';
const EMAIL_KEY = 'user_email';
const PHONE_KEY = 'user_phone';

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
  if (typeof window !== 'undefined') {
  return localStorage.getItem(ROLE_KEY) || sessionStorage.getItem(ROLE_KEY);
  }
  else return null
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

// ✅ Сохранение email
const saveEmail = (email: string, rememberMe: boolean) => {
  if (rememberMe) {
    localStorage.setItem(EMAIL_KEY, email);
  } else {
    sessionStorage.setItem(EMAIL_KEY, email);
  }
};

// ✅ Получение email
const getEmail = (): string | null => {
  return localStorage.getItem(EMAIL_KEY) || sessionStorage.getItem(EMAIL_KEY);
};

// ✅ Удаление email
const removeEmail = () => {
  localStorage.removeItem(EMAIL_KEY);
  sessionStorage.removeItem(EMAIL_KEY);
};

// ✅ Сохранение phone
const savePhone = (phone: string, rememberMe: boolean) => {
  if (rememberMe) {
    localStorage.setItem(PHONE_KEY, phone);
  } else {
    sessionStorage.setItem(PHONE_KEY, phone);
  }
};

// ✅ Получение phone
const getPhone = (): string | null => {
  return localStorage.getItem(PHONE_KEY) || sessionStorage.getItem(PHONE_KEY);
};

// ✅ Удаление phone
const removePhone = () => {
  localStorage.removeItem(PHONE_KEY);
  sessionStorage.removeItem(PHONE_KEY);
};

const clearAllUserData = () => {
  removeToken();
  removeRole();
  removeEmail();
  removePhone();
};

const request = async (
  method: string,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  config?: AxiosRequestConfig
) => {
  const token = getToken();
  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data"; // ⚡ Добавляем поддержку файлов
  }

  const axiosConfig = { ...config, headers };
  const fullUrl = `${BASE_URL}${url}`;

  switch (method.toLowerCase()) {
    case "get":
      return axios.get(fullUrl, axiosConfig);
    case "post":
      return axios.post(fullUrl, data, axiosConfig);
    case "put":
      return axios.put(fullUrl, data, axiosConfig);
    case "delete":
      return axios.delete(fullUrl, axiosConfig);
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
};


export { BASE_URL , clearAllUserData , getPhone, getEmail , saveEmail , savePhone, saveRole , getRole , removeRole , saveToken, getToken, removeToken, useAuthInterceptor, request };
