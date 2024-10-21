import { ordersApi } from "@/api/ordersApi";
import { Order } from "@/types/order.type";
import { PaginationResponse, ParamPagination } from "@/types/pagination.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllOrders = (params: ParamPagination) => {
  return useQuery<PaginationResponse<Order>>({
    queryKey: ["orders", params.keyword],
    queryFn: async () => {
      return (await ordersApi.getAll(params)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
