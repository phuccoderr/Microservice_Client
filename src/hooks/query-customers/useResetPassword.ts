import customersApi from "@/api/customersApi";
import { AUTH_CONST } from "@/constants/auth";
import { COMMONS_CONST } from "@/constants/commons";
import { useToastMessage } from "@/hooks/useToastMessage";
import { ErrorResponse } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () => {
  const { toastSuccess, toastError } = useToastMessage();
  return useMutation({
    mutationFn: async ({
      token,
      password,
    }: {
      token: string;
      password: string;
    }) => {
      return await customersApi.resetPassword(token, password);
    },
    onSuccess: () => {
      toastSuccess(AUTH_CONST.CHANGE_PASSWORD_SUCCESS);
    },
    onError: (error: ErrorResponse) => {
      toastError(COMMONS_CONST.ERROR);
    },
  });
};
