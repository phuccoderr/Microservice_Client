import { productsApi } from "@/api/productsApi";
import { PaginationResponse, ParamPagination } from "@/types/pagination.type";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = ({
  page = 1,
  limit = 100,
  sort = "asc",
  keyword = "",
}: ParamPagination) => {
  return useQuery<PaginationResponse<Product>>({
    queryKey: ["products", page, limit, sort, keyword],
    queryFn: async () => {
      return (await productsApi.get({ page, limit, sort, keyword })).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnReconnect: true,
  });
};
