import { authUserAxiosClient, usersAxiosClient } from "@/api/axiosClient";
import { Login } from "@/types/login.type";
import { ParamPagination } from "@/types/pagination.type";
import { CreateUser, UpdateUser } from "@/types/users.type";

export const usersApi = {
  login(param: Login) {
    const url = `/login`;
    return authUserAxiosClient.post(url, param);
  },
  logout(token: string) {
    const url = `/logout`;
    return authUserAxiosClient.get(url, { params: { token } });
  },
  refreshToken(token: string) {
    const url = `/refresh?token=${token}`;
    return authUserAxiosClient.get(url);
  },
  me() {
    const url = "/me";
    return usersAxiosClient.get(url);
  },
  get(params: ParamPagination) {
    const url = "";
    return usersAxiosClient.get(url, { params });
  },
  create: (params: CreateUser) => {
    const url = "";
    return usersAxiosClient.post(url, params);
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
