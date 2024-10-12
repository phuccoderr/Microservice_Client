import { cartsApi } from "@/api/cartsApi";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      quantity,
      product_id,
    }: {
      quantity: number;
      product_id: string;
    }) => {
      return (await cartsApi.addToCart(quantity, product_id)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
    onError: (error: ErrorResponse) => {
      return error;
    },
  });
};
