import { discountsApi } from "@/api/discountsApi";
import { DISCOUNT_CONST } from "@/constants/discounts";
import { useToastMessage } from "@/hooks/useToastMessage";
import { CreateDiscount } from "@/types/discount.type";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateDiscount = () => {
  const queryClient = useQueryClient();
  const navigate = useRouter();
  const { toastSuccess, toastError } = useToastMessage();

  return useMutation({
    mutationFn: async (body: CreateDiscount) => {
      return (await discountsApi.create(body)).data;
    },
    onSuccess: () => {
      toastSuccess(DISCOUNT_CONST.CREATE_SUCCESS);
      queryClient.refetchQueries({ queryKey: ["discounts"] });
      navigate.push("/admin/discounts");
    },
    onError: (error: ErrorResponse) => {
      toastError(DISCOUNT_CONST.CREATE_FAIL);
      return error;
    },
  });
};
