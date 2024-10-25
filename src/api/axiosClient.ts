import { refreshToken } from "@/api/jwtClient";
import URL_CONST from "@/constants/api";
import { ErrorResponse } from "@/types/error.type";
import { CookieUtils } from "@/utils/cookie-utils";
import axios from "axios";

const createAxiosInstance = (
  baseUrl: string,
  urlLogin: string,
  isRedirect: boolean,
) => {
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
      return response.data;
    },
    async (error): Promise<ErrorResponse> => {
      const originalRequest = error.config;

      if (!originalRequest._retryCount) {
        originalRequest._retryCount = 0;
      }

      if (error.response.status === 401 && originalRequest._retryCount < 2) {
        originalRequest._retry = true;
        originalRequest._retryCount += 1;

        try {
          const newAccessToken = await refreshToken(isRedirect, urlLogin);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosClient(originalRequest);
        } catch (refreshError) {
          throw refreshError;
        }
      }
      throw error.response.data;
    },
  );

  return axiosClient;
};

export const authUserAxiosClient = createAxiosInstance(
  URL_CONST.AUTH,
  "/admin/login",
  true,
);
export const usersAxiosClient = createAxiosInstance(
  URL_CONST.USERS,
  "/admin/login",
  true,
);
export const categoriesAxiosClient = createAxiosInstance(
  URL_CONST.CATEGORIES,
  "/admin/login",
  true,
);
export const productsAxiosClient = createAxiosInstance(
  URL_CONST.PRODUCTS,
  "/admin/login",
  true,
);
export const discountsAxiosClient = createAxiosInstance(
  URL_CONST.DISCOUNTS,
  "/admin/login",
  true,
);

export const customersAxiosClient = createAxiosInstance(
  URL_CONST.CUSTOMER,
  "/login",
  false,
);

export const cartsAxiosClient = createAxiosInstance(
  URL_CONST.CART,
  "/login",
  true,
);

export const ordersAxiosClient = createAxiosInstance(
  URL_CONST.ORDERS,
  "/login",
  true,
);

export const reviewsAxiosClient = createAxiosInstance(
  URL_CONST.REVIEWS,
  "/login",
  true,
);

export const chatsAxiosClient = createAxiosInstance(
  URL_CONST.CHATS,
  "/login",
  false,
);
