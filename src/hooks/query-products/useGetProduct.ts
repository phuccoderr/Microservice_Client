import { productsApi } from "@/api/productsApi";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";

export const useGetProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      return (await productsApi.getOne(id)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnReconnect: true,
  });
};
