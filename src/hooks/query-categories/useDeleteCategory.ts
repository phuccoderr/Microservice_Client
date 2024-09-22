import categoriesApi from "@/api/categoriesApi";
import { usersApi } from "@/api/usersApi";
import CATEGORIES_CONST from "@/constants/categories";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCategory = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const { setModalDelete } = useCategoryStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return (await categoriesApi.delete(id)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["categories"] });
      toastSuccess(CATEGORIES_CONST.DELETE_SUCCESS);
      setModalDelete(false);
    },
    onError: (error) => {
      toastError(error.message);
    },
  });
};
