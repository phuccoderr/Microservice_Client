import { reviewsApi } from "@/api/reviewsApi";
import { PaginationResponse, ParamPagination } from "@/types/pagination.type";
import { Review } from "@/types/review.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllReviews = ({
  page = 1,
  limit = 100,
  sort = "asc",
  keyword = "",
}: ParamPagination) => {
  return useQuery<PaginationResponse<Review>>({
    queryKey: ["reviews", keyword],
    queryFn: async () => {
      return (await reviewsApi.getAll({ page, limit, sort, keyword })).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnReconnect: true,
  });
};
