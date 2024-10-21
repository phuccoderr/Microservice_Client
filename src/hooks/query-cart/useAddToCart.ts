import { cartsApi } from "@/api/cartsApi";
import { COMMONS_CONST } from "@/constants/commons";
import { useToastMessage } from "@/hooks/useToastMessage";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { toastError, toastSuccess } = useToastMessage();

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
      toastSuccess(COMMONS_CONST.ADD_TO_CART);
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
    onError: (error: ErrorResponse) => {
      toastError(COMMONS_CONST.ADD_TO_ERROR);
      return error;
    },
  });
};
