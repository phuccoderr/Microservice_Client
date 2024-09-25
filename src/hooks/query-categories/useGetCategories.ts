import categoriesApi from "@/api/categoriesApi";
import { Category } from "@/types/category.type";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = (id: string) => {
  return useQuery<Category>({
    queryKey: ["category", id],
    queryFn: async () => {
      return (await categoriesApi.getOne(id)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
