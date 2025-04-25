import { toast } from 'sonner';

export interface ToastMessages {
    type: 'success' | 'error';
    message: string;
}

export const showToast = (toastMessage: ToastMessages) => {
  toast[toastMessage.type](toastMessage.message);
};
