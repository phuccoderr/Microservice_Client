import { reviewsApi } from "@/api/reviewsApi";
import { useQuery } from "@tanstack/react-query";

export const useCanReview = (customerId: string, proId: string) => {
  return useQuery({
    queryKey: ["canReview", proId],
    queryFn: async () => {
      return (await reviewsApi.canReview(customerId, proId)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
