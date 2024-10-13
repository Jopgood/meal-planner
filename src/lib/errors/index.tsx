import { useErrorStore } from "@/stores/error";
import { ToastActionElement } from "@/components/ui/toast";

export const handleError = (
  error: unknown,
  customAction?: ToastActionElement
) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  useErrorStore.getState().addError(errorMessage, customAction);

  // Optionally, you can still log the error for debugging
  console.error(error);
};
