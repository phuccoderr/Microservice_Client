import { toast } from "sonner";

export const useToastMessage = () => {
  const toastLoading = (message: string) => {
    toast.loading(message, {
      id: "default",
      position: "top-center",
    });
  };
  const toastSuccess = (message: string) =>
    toast.success(message, {
      id: "default",
      position: "top-center",
      richColors: true,
    });

  const toastError = (message: string) =>
    toast.error(message, {
      id: "default",
      position: "top-center",
      richColors: true,
    });

  return { toastLoading, toastSuccess, toastError };
};
