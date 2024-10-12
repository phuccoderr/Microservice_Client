import { discountsApi } from "@/api/discountsApi";
import { DISCOUNT_CONST } from "@/constants/discounts";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useDiscountStore } from "@/store/useDiscountStore";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDiscount = () => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToastMessage();
  const { setModalDelete } = useDiscountStore();
  return useMutation({
    mutationFn: async (id: string) => {
      return await discountsApi.delete(id);
    },
    onSuccess: () => {
      toastSuccess(DISCOUNT_CONST.DELETE_SUCCESS);
      queryClient.refetchQueries({ queryKey: ["discounts"] });
      setModalDelete(false);
    },
    onError: (error) => {
      toastError(DISCOUNT_CONST.DELETE_FAIL);
      return error;
    },
  });
};
