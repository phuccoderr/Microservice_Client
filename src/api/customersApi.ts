import { customersAxiosClient } from "@/api/axiosClient";
import { ParamPagination } from "@/types/pagination.type";

const customersApi = {
  get: (params: ParamPagination) => {
    const url = "";
    return customersAxiosClient.get(url, { params });
  },
  getOne: (id: string) => {
    const url = `${id}`;
    return customersAxiosClient.get(url);
  },
  updateStatus: (id: string, status: boolean) => {
    const url = `${id}/status/${status}`;
    return customersAxiosClient.patch(url);
  },
};

export default customersApi;
