import { discountsAxiosClient } from "@/api/axiosClient";
import { CreateDiscount } from "@/types/discount.type";
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
  create(body: CreateDiscount) {
    const url = "";
    return discountsAxiosClient.post(url, body);
  },
  checkCode(code: string) {
    const url = `${code}`;
    return discountsAxiosClient.post(url);
  },
  applyCode(code: string) {
    const url = `apply/${code}`;
    return discountsAxiosClient.post(url);
  },
};
