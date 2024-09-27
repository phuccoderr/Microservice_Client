import customersApi from "@/api/customersApi";
import { COMMONS_CONST } from "@/constants/commons";
import { useToastMessage } from "@/hooks/useToastMessage";
import { ErrorResponse } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";

export const useForgotPassword = () => {
  const { toastSuccess, toastError } = useToastMessage();
  return useMutation({
    mutationFn: async (email: string) => {
      return (await customersApi.forgotPassword(email)).data;
    },
    onSuccess: (data) => {
      toastSuccess("Quên mật khẩu thành công, vui lòng kiểm tra email của bạn");
    },
    onError: (error: ErrorResponse) => {
      toastError(COMMONS_CONST.NOT_EXISTS_EMAIL);
    },
  });
};
