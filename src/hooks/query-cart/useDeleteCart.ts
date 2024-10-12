import { cartsApi } from "@/api/cartsApi";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Error from "next/error";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product_id: string) => {
      return await cartsApi.deleteProduct(product_id);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
    onError: (error: ErrorResponse) => {
      return error;
    },
  });
};
