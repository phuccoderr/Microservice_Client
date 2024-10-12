import categoriesApi from "@/api/categoriesApi";
import { Category } from "@/types/category.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategoriesHome = () => {
  return useQuery<Category[]>({
    queryKey: ["category-home"],
    queryFn: async () => {
      return (await categoriesApi.getAll()).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
