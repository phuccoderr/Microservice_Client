import { usersApi } from "@/api/usersApi";
import { AUTH_CONST } from "@/constants/login";
import { useToastMessage } from "@/hook/useToastMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { Login } from "@/types/login.type";
import { CookieUtils } from "@/utils/cookie-utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const router = useRouter();
  const { setIsAuth } = useAuthStore();

  return useMutation({
    mutationFn: async (param: Login) => {
      return (await usersApi.login(param)).data;
    },
    onSuccess: (data) => {
      CookieUtils.set("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      toastSuccess(AUTH_CONST.LOGIN_SUCCESS);
      setIsAuth(true);
      router.push("/admin");
    },
    onError: (error) => {
      toastError(AUTH_CONST.LOGIN_FAILED);
    },
  });
};
