import type { ToastMessages } from '../utils/toastHelper';
const toastMessages = {
  endpoint: {
    createSuccess: {
      type: 'success',
      message: 'Endpoint added successfully!',
    } satisfies ToastMessages,
    createError: {
      type: 'error',
      message: 'Failed to add endpoint. Please try again.',
    } satisfies ToastMessages,
    updateSuccess: {
      type: 'success',
      message: 'Endpoint updated successfully!',
    } satisfies ToastMessages,
    deleteSuccess: {
      type: 'success',
      message: 'Endpoint deleted successfully!',
    } satisfies ToastMessages,
    deleteError: {
      type: 'error',
      message: 'Failed to delete endpoint. Please try again.',
    } satisfies ToastMessages,
    updateError: {
      type: 'error',
      message: 'Failed to update endpoint. Please try again.',
    } satisfies ToastMessages,
  },
  auth: {
    loginSuccess: {
      type: 'success',
      message: 'Welcome back!',
    } satisfies ToastMessages,
    loginError: {
      type: 'error',
      message: 'Login failed. Please try again.',
    } satisfies ToastMessages,
    unauthorized: {
      type: 'error',
      message: 'Your session has expired.',
    } satisfies ToastMessages,
    registerSuccess: {
      type: 'success',
      message: 'Registration successful!',
    } satisfies ToastMessages,
    registerError: {
      type: 'error',
      message: 'Registration failed. Please try again.',
    } satisfies ToastMessages,
  },
};

export default toastMessages;
