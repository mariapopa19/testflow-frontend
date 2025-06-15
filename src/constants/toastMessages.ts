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
  testRun: {
    runSuccess: {
      type: 'success',
      message: 'Test run started successfully!',
    } satisfies ToastMessages,
    runError: {
      type: 'error',
      message: 'Failed to start test run. Please try again.',
    } satisfies ToastMessages,
    generateSuccess: {
      type: 'success',
      message: 'Test case generated successfully!',
    } satisfies ToastMessages,
    generateError: {
      type: 'error',
      message: 'Failed to generate test case. Please try again.',
    } satisfies ToastMessages,
    generateAIError: {
      type: 'error',
      message: 'Failed to generate test case with AI.',
    } satisfies ToastMessages,
  },
  reports: {
    deleteSuccess: {
      type: 'success',
      message: 'Report deleted successfully!',
    } satisfies ToastMessages,
    deleteError: {
      type: 'error',
      message: 'Failed to delete report. Please try again.',
    } satisfies ToastMessages,
    loadError: {
      type: 'error',
      message: 'Failed to load reports. Please try again.',
    } satisfies ToastMessages
  },
};

export default toastMessages;
