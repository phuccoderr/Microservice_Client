import { ordersAxiosClient } from "@/api/axiosClient";
import { ParamPagination } from "@/types/pagination.type";

export const ordersApi = {
  getAll(params: ParamPagination) {
    const url = "";
    return ordersAxiosClient.get(url, { params });
  },
  me() {
    const url = "details";
    return ordersAxiosClient.get(url);
  },
  getOne(_id: string) {
    const url = `${_id}`;
    return ordersAxiosClient.get(url);
  },
};
