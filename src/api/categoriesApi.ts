import { usersAxiosClient } from "@/api/axiosClient";
import { ParamPagination } from "@/types/pagination.type";

const baseURL = "http://localhost:9130/api/v1/categories";

const categoriesApi = {
  get: (params: ParamPagination) => {
    const url = baseURL;
    return usersAxiosClient.get(url, { params });
  },
};

export default categoriesApi;
