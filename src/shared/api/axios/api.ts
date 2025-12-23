import axios from 'axios';
import { useAuthStore } from '@/features/auth/model/authStore.ts';
import { useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL;

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const $apiFormData = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
const navigate = useNavigate();
$api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const logout = useAuthStore.getState().logout;
      logout();
      navigate('/login');
    }
    return Promise.reject(error);
  },
);
