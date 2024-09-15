import toast from "react-hot-toast";
export const useToastMessage = () => {
  const toastLoading = (message: string) => {
    toast.loading(message, {
      id: "default",
    });
  };
  const toastSuccess = (message: string) =>
    toast.success(message, {
      id: "default",
    });

  const toastError = (message: string) =>
    toast.error(message, {
      id: "default",
    });

  return { toastLoading, toastSuccess, toastError };
};
