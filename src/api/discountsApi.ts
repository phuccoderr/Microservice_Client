import { discountsAxiosClient } from "@/api/axiosClient";
import { ParamPagination } from "@/types/pagination.type";

export const discountsApi = {
  get: (params: ParamPagination) => {
    const url = "";
    return discountsAxiosClient.get(url, { params });
  },
  delete(id: string) {
    const url = `${id}`;
    return discountsAxiosClient.delete(url);
  },
};
