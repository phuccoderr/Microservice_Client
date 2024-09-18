import { categoriesAxiosClient } from "@/api/axiosClient";
import { CategoryRequest } from "@/types/category.type";
import { ParamPagination } from "@/types/pagination.type";

const categoriesApi = {
  get: (params: ParamPagination) => {
    const url = "";
    return categoriesAxiosClient.get(url, { params });
  },
  create: (params: CategoryRequest) => {
    const url = "";
    return categoriesAxiosClient.post(url, params);
  },
  update: (id: string, params: CategoryRequest) => {
    const url = `/${id}`;
    return categoriesAxiosClient.patch(url, params);
  },
  delete(id: string) {
    const url = `${id}`;
    return categoriesAxiosClient.delete(url);
  },
};

export default categoriesApi;
