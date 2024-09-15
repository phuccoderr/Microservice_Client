import { refreshToken } from "@/api/jwtClient";
import { CookieUtils } from "@/utils/cookie-utils";
import axios from "axios";

const createAxiosInstance = (baseUrl: string) => {
  const axiosClient = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: baseUrl,
  });

  axiosClient.interceptors.request.use((config) => {
    const sessionToken = CookieUtils.get("access_token");

    if (sessionToken && !config?.headers.Authorization) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }
    return config;
  });

  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshToken();
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosClient(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosClient;
};

export const usersAxiosClient = createAxiosInstance(
  "http://localhost:9120/api/v1/users",
);
