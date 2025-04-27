import api from './api';

interface AuthResponse {
  token: string;
  email: string;
  name: string;
  picture: string;
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

export const loginWithEmail = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/auth/login', {
    email,
    password,
  });
  return response.data;
}

export const registerWithEmail = async (
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/auth/register', {
    name,
    email,
    password,
  });
  return response.data;
};

