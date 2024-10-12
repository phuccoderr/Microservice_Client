import customersApi from "@/api/customersApi";
import { AUTH_CONST } from "@/constants/auth";
import { COMMONS_CONST } from "@/constants/commons";
import { useToastMessage } from "@/hooks/useToastMessage";
import { ErrorResponse } from "@/types/error.type";
import { CookieUtils } from "@/utils/cookie-utils";
import { useMutation } from "@tanstack/react-query";

export const useLogoutCustomer = () => {
  const { toastSuccess, toastError } = useToastMessage();

  return useMutation({
    mutationFn: async (token: string) => {
      return (await customersApi.logout(token)).data;
    },
    onSuccess: (data) => {
      CookieUtils.remove("access_token");
      CookieUtils.remove("refresh_token");
      toastSuccess(AUTH_CONST.LOG_OUT);
      window.location.href = "/";
    },
    onError: (error: ErrorResponse) => {
      toastError(COMMONS_CONST.ERROR);
    },
  });
};
