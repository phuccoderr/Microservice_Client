import { usersApi } from "@/api/usersApi";
import { AUTH_CONST } from "@/constants/auth";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { CookieUtils } from "@/utils/cookie-utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogoutUser = () => {
  const { toastSuccess } = useToastMessage();
  const router = useRouter();

  return useMutation({
    mutationFn: async (token: string) => {
      return (await usersApi.logout(token)).data;
    },
    onSuccess: (data) => {
      CookieUtils.remove("access_token");
      CookieUtils.remove("refresh_token");
      toastSuccess(AUTH_CONST.LOG_OUT);
      router.push("/admin/login");
    },
  });
};
