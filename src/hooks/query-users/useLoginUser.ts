import { usersApi } from "@/api/usersApi";
import { AUTH_CONST } from "@/constants/auth";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { Login } from "@/types/login.type";
import { CookieUtils } from "@/utils/cookie-utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLoginUser = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const router = useRouter();

  return useMutation({
    mutationFn: async (param: Login) => {
      return (await usersApi.login(param)).data;
    },
    onSuccess: (data) => {
      CookieUtils.set("access_token", data.access_token);
      CookieUtils.set("refresh_token", data.refresh_token);
      toastSuccess(AUTH_CONST.LOGIN_SUCCESS);
      router.push("/admin");
    },
    onError: (error) => {
      toastError(AUTH_CONST.LOGIN_FAILED);
    },
  });
};
