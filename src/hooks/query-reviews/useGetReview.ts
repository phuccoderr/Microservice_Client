import { reviewsApi } from "@/api/reviewsApi";
import { Review } from "@/types/review.type";
import { useQuery } from "@tanstack/react-query";

export const useGetReview = (id: string) => {
  return useQuery<Review>({
    queryKey: ["review", id],
    queryFn: async () => {
      return (await reviewsApi.getOne(id)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnReconnect: true,
  });
};
