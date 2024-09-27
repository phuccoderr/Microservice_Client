import customersApi from "@/api/customersApi";
import { useQuery } from "@tanstack/react-query";

export const useVerifyEmailCustomer = (token: string) => {
  return useQuery({
    queryKey: [],
    queryFn: async () => {
      return await customersApi.verifyEmail(token);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
    refetchOnReconnect: false,
  });
};
