import { ordersApi } from "@/api/ordersApi";
import { Report } from "@/types/report.type";
import { useQuery } from "@tanstack/react-query";

export const useGetReports = (period: string) => {
  return useQuery<Report[]>({
    queryKey: ["reports", period],
    queryFn: async () => {
      return (await ordersApi.reports(period)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
