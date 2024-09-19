import { productsAxiosClient } from "@/api/axiosClient";
import { ParamPagination } from "@/types/pagination.type";

export const productsApi = {
  get(params: ParamPagination) {
    const url = "";
    return productsAxiosClient.get(url, { params });
  },
};
