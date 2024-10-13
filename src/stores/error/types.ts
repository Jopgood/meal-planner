import { ToastActionElement } from "@/components/ui/toast";

export interface ErrorState {
  errors: Array<{
    id: string;
    message: string;
    action?: ToastActionElement;
  }>;
  addError: (message: string, action?: ToastActionElement) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
}
