import { productsApi } from "@/api/productsApi";
import { PRODUCT_CONST } from "@/constants/products";
import { useToastMessage } from "@/hooks/useToastMessage";
import { InfoProduct } from "@/types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProduct = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InfoProduct }) => {
      return (await productsApi.update(id, data)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["products"] });
      toastSuccess(PRODUCT_CONST.UPDATE_SUCCESS);
    },
    onError: (error) => {
      toastError(PRODUCT_CONST.ALREADY_NAME);
    },
  });
};
