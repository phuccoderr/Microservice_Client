import customersApi from "@/api/customersApi";
import { AUTH_CONST } from "@/constants/auth";
import { useToastMessage } from "@/hooks/useToastMessage";
import { ErrorResponse } from "@/types/error.type";
import { Login } from "@/types/login.type";
import { CookieUtils } from "@/utils/cookie-utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLoginCustomer = () => {
  const { toastSuccess } = useToastMessage();
  const router = useRouter();

  return useMutation({
    mutationFn: async (param: Login) => {
      return (await customersApi.login(param)).data;
    },
    onSuccess: (data) => {
      CookieUtils.set("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      toastSuccess(AUTH_CONST.LOGIN_SUCCESS);
      router.push("/");
    },
    onError: (error: ErrorResponse) => error,
  });
};
