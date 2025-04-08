import api from './api';

interface AuthResponse {
  token: string;
  email: string;
  name: string;
}

export const loginWithGoogle = async (idToken: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/auth/google-login', { idToken });
  return response.data;
};

export const registerWithGoogle = async (idToken: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/auth/google-register', { idToken });
  return response.data;
};