import { usersApi } from "@/api/usersApi";
import { PaginationResponse, ParamPagination } from "@/types/pagination.type";
import { User } from "@/types/users.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = ({
  page = 1,
  limit = 100,
  sort = "asc",
  keyword = "",
}: ParamPagination) => {
  return useQuery<PaginationResponse<User>>({
    queryKey: ["users", keyword],
    queryFn: async () => {
      return (await usersApi.get({ page, limit, sort, keyword })).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnReconnect: true,
  });
};
