import { discountsApi } from "@/api/discountsApi";
import { Discount } from "@/types/discount.type";
import { PaginationResponse, ParamPagination } from "@/types/pagination.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllDiscounts = (pagination: ParamPagination) => {
  return useQuery<PaginationResponse<Discount>>({
    queryKey: ["discounts", pagination.keyword],
    queryFn: async () => {
      return (await discountsApi.get(pagination)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnReconnect: true,
  });
};
