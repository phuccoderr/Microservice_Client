import { usersApi } from "@/api/usersApi";
import { AUTH_CONST } from "@/constants/login";
import { useToastMessage } from "@/hook/useToastMessage";
import { CookieUtils } from "@/utils/cookie-utils";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";

export const useLogoutMutation = () => {
  const { toastSuccess } = useToastMessage();
  const router = useRouter();

  return useMutation({
    mutationFn: async (token: string) => {
      return (await usersApi.logout(token)).data;
    },
    onSuccess: (data) => {
      console.log(data);
      CookieUtils.remove("access_token");
      localStorage.removeItem("refresh_token");
      toastSuccess(AUTH_CONST.LOG_OUT);
      router.push("/admin/login");
    },
  });
};
