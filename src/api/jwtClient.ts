import { usersApi } from "@/api/usersApi";
import { CookieUtils } from "@/utils/cookie-utils";

export const getAccessToken = (): string | undefined => {
  const token = CookieUtils.get("access_token");
  return token;
};

export const getRefreshToken = (): string => {
  const token = CookieUtils.get("refresh_token");
  return token ?? "";
};

export const refreshToken = async (isRedirect: boolean, urlLogin: string) => {
  try {
    const response = await usersApi.refreshToken(getRefreshToken());
    const newAccessToken = response.data.access_token;
    CookieUtils.set("access_token", newAccessToken);

    return newAccessToken;
  } catch (error) {
    CookieUtils.remove("access_token");
    CookieUtils.remove("refresh_token");
    if (isRedirect) {
      window.location.href = urlLogin;
    }
    throw error;
  }
};
