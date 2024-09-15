import { usersAxiosClient } from "@/api/axiosClient";
import { Login } from "@/types/login.type";
import { ParamPagination } from "@/types/pagination.type";
import { UpdateUser } from "@/types/users.type";
import axios from "axios";

const baseURL = "http://localhost:9120/api/v1/users";

export const usersApi = {
  login(param: Login) {
    const url = `${baseURL}/auth/login`;
    return axios.post(url, param);
  },
  logout(token: string) {
    const url = `${baseURL}/auth/logout`;
    return axios.post(url, { token: token });
  },
  refreshToken(token: string) {
    const url = `${baseURL}/auth/refresh`;
    return axios.post(url, token);
  },
  get(params: ParamPagination) {
    const url = "";
    return usersAxiosClient.get(url, { params });
  },
  updateUser(params: UpdateUser) {
    const { _id, ...data } = params;

    const url = `${params._id}`;

    return usersAxiosClient.patch(url, data);
  },
  delete(id: string) {
    const url = `${id}`;
    return usersAxiosClient.delete(url);
  },
  updateStatus(params: any) {
    const url = `${params.id}/status/${params.status}`;
    return usersAxiosClient.patch(url);
  },
};
