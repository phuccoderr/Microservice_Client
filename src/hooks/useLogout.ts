import { usersApi } from "@/api/usersApi";
import { AUTH_CONST } from "@/constants/auth";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { CookieUtils } from "@/utils/cookie-utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogoutMutation = () => {
  const { toastSuccess } = useToastMessage();
  const { setIsAuth } = useAuthStore();
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
      setIsAuth(false);
      router.push("/admin/login");
    },
  });
};
