import { productsApi } from "@/api/productsApi";
import { COMMONS_CONST } from "@/constants/commons";
import { PRODUCT_CONST } from "@/constants/products";
import { useToastMessage } from "@/hooks/useToastMessage";
import { ErrorResponse } from "@/types/error.type";
import { CreateProduct } from "@/types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateProduct = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateProduct) => {
      return (await productsApi.create(data)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["products"] });
      toastSuccess(PRODUCT_CONST.CREATE_SUCCESS);
      router.back();
    },
    onError: (error: ErrorResponse) => {
      if (error.statusCode === 422) {
        toastError(PRODUCT_CONST.ALREADY_NAME);
      } else {
        toastError(COMMONS_CONST.ERROR);
      }
    },
  });
};
