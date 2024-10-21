import { discountsApi } from "@/api/discountsApi";
import { DISCOUNT_CONST } from "@/constants/discounts";
import { useToastMessage } from "@/hooks/useToastMessage";
import { Discount } from "@/types/discount.type";
import { useMutation } from "@tanstack/react-query";

export const useCheckDiscount = () => {
  const { toastSuccess, toastError } = useToastMessage();

  return useMutation({
    mutationFn: async (code: string) => {
      return (await discountsApi.checkCode(code)).data;
    },
    onSuccess: (data: Discount) => {
      toastSuccess(DISCOUNT_CONST.CHECK_SUCCESS);
    },
    onError: (error) => {
      toastError(DISCOUNT_CONST.CHECK_FAIL);
      console.log(error);
      return error;
    },
  });
};
