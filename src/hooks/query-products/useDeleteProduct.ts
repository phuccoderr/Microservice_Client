import categoriesApi from "@/api/categoriesApi";
import { productsApi } from "@/api/productsApi";
import { PRODUCT_CONST } from "@/constants/products";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useProductStore } from "@/store/useProductStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const { setModalDelete } = useProductStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return (await productsApi.delete(id)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["products"] });
      toastSuccess(PRODUCT_CONST.DELETE_SUCCESS);
      setModalDelete(false);
    },
    onError: (error) => {
      toastError(error.message);
    },
  });
};
