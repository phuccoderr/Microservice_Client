import customersApi from "@/api/customersApi";
import { Customer } from "@/types/customer.type";
import { useQuery } from "@tanstack/react-query";

export const useGetCustomer = (id: string) => {
  return useQuery<Customer>({
    queryKey: ["customer", id],
    queryFn: async () => {
      return (await customersApi.getOne(id)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnReconnect: true,
  });
};
