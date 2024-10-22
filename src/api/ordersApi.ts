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
  getOne(id: string) {
    const url = `${id}`;
    return ordersAxiosClient.get(url);
  },
  updateStatus(id: string, status: string) {
    const url = `${id}/status/${status}`;
    return ordersAxiosClient.get(url);
  },
};
