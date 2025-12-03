import axios from 'axios';
import { API_BASE_URL, AUTH_ENDPOINTS } from '../utils/constants';
import type { LoginFormData, RegisterFormData, AuthResponse, User } from '../types/auth.types';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const authService = {
  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await api.post(AUTH_ENDPOINTS.REGISTER, data);
    return response.data;
  },

  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, data);
    return response.data;
  },

  logout: async (): Promise<AuthResponse> => {
    const response = await api.post(AUTH_ENDPOINTS.LOGOUT);
    return response.data;
  },

  getProfile: async (): Promise<{ user: User }> => {
    const response = await api.get(AUTH_ENDPOINTS.PROFILE);
    return response.data;
  },
};