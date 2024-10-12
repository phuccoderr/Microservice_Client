import { customersAxiosClient } from "@/api/axiosClient";
import { Login } from "@/types/login.type";
import { ParamPagination } from "@/types/pagination.type";
import { Register } from "@/types/register.type";

const customersApi = {
  login: (data: Login) => {
    const url = `auth/login`;
    return customersAxiosClient.post(url, data);
  },
  logout: (token: string) => {
    const url = `auth/logout`;
    return customersAxiosClient.get(url, { params: { token } });
  },
  register: (data: Register) => {
    const url = `auth/register`;
    return customersAxiosClient.post(url, data);
  },
  verifyEmail: (token: string) => {
    const url = `auth/verify`;
    return customersAxiosClient.get(url, { params: { token } });
  },
  forgotPassword: (email: string) => {
    const url = `auth/forgot_password`;
    return customersAxiosClient.post(url, {}, { params: { email } });
  },
  resetPassword: (token: string, password: string) => {
    const url = `auth/reset_password`;
    return customersAxiosClient.patch(url, { password }, { params: { token } });
  },
  get: (params: ParamPagination) => {
    const url = "";
    return customersAxiosClient.get(url, { params });
  },
  getOne: (id: string) => {
    const url = `${id}`;
    return customersAxiosClient.get(url);
  },
  me: () => {
    const url = "account";
    return customersAxiosClient.get(url);
  },
  updateStatus: (id: string, status: boolean) => {
    const url = `${id}/status/${status}`;
    return customersAxiosClient.patch(url);
  },
};

export default customersApi;
