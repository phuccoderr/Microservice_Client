import { usersApi } from "@/api/usersApi";
import { AUTH_CONST } from "@/constants/login";
import { useToastMessage } from "@/hook/useToastMessage";
import { Login } from "@/types/login.type";
import { CookieUtils } from "@/utils/cookie-utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const router = useRouter();

  return useMutation({
    mutationFn: async (param: Login) => {
      return (await usersApi.login(param)).data;
    },
    onSuccess: (data) => {
      CookieUtils.set("access_token", data.data.access_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);
      toastSuccess(AUTH_CONST.LOGIN_SUCCESS);
      router.push("/admin");
    },
    onError: (error) => {
      toastError(AUTH_CONST.LOGIN_FAILED);
    },
  });
};
