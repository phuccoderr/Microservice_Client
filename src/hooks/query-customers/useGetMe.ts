import customersApi from "@/api/customersApi";
import { Customer } from "@/types/customer.type";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  return useQuery<Customer>({
    queryKey: ["me"],
    queryFn: async () => {
      return (await customersApi.me()).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
