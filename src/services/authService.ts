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

export const updateUserProfile = async (name: string): Promise<{ name: string }> => {
  console.log('Updating profile with name:', name);
  // Simulare apel API
  // const response = await api.patch('/api/user/profile', { name });
  // return response.data;
  return Promise.resolve({ name });
};

export const changeUserPassword = async (passwordData: object): Promise<void> => {
  console.log('Changing password...');
  // Simulare apel API
  // await api.post('/api/user/change-password', passwordData);
  return Promise.resolve();
};

export const getUserApiKey = async (): Promise<string> => {
  // Simulare apel API
  return Promise.resolve('MOCK_API_KEY_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
};

export const regenerateUserApiKey = async (): Promise<string> => {
  console.log('Regenerating API key...');
  // Simulare apel API
  const newKey = `MOCK_API_KEY_NEW_${Date.now()}`.slice(0, 36);
  return Promise.resolve(newKey);
};

