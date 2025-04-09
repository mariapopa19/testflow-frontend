import api from './api';

interface AuthResponse {
  token: string;
  email: string;
  name: string;
}

export const loginWithGoogle = async (
  accessToken: string,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/auth/google-login', {
    accessToken,
  });
  return response.data;
};

export const registerWithGoogle = async (
  accessToken: string,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/auth/google-register', {
    accessToken,
  });
  return response.data;
};
