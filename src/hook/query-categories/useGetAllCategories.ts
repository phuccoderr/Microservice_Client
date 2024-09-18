import categoriesApi from "@/api/categoriesApi";
import { Category } from "@/types/category.type";
import { PaginationResponse, ParamPagination } from "@/types/pagination.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = ({
  page = 1,
  limit = 100,
  sort = "asc",
  keyword = "",
}: ParamPagination) => {
  return useQuery<PaginationResponse<Category>>({
    queryKey: ["categories", page, limit, sort, keyword],
    queryFn: async () => {
      return (await categoriesApi.get({ page, limit, sort, keyword })).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnReconnect: true,
  });
};
