import customersApi from "@/api/customersApi";
import { Customer } from "@/types/customer.type";
import { PaginationResponse, ParamPagination } from "@/types/pagination.type";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCustomers = ({
  page = 1,
  limit = 100,
  sort = "asc",
  keyword = "",
}: ParamPagination) => {
  return useQuery<PaginationResponse<Customer>>({
    queryKey: ["customers", page, limit, sort, keyword],
    queryFn: async () => {
      return (await customersApi.get({ page, limit, sort, keyword })).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnReconnect: true,
  });
};
