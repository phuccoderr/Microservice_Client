import { usersApi } from "@/api/usersApi";
import { useAuthStore } from "@/store/useAuthStore";
import { CookieUtils } from "@/utils/cookie-utils";

export const getAccessToken = (): string | undefined => {
  const token = CookieUtils.get("access_token");
  return token;
};

export const getLocalRefreshToken = (): string => {
  const token = localStorage.getItem("refresh_token");
  return token || "";
};

export const refreshToken = async () => {
  try {
    const response = await usersApi.refreshToken(getLocalRefreshToken());
    const newAccessToken = response.data.access_token;
    CookieUtils.set("access_token", newAccessToken);

    return newAccessToken;
  } catch (error) {
    CookieUtils.remove("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/admin/login";
    throw error;
  }
};
