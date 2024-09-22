import categoriesApi from "@/api/categoriesApi";
import CATEGORIES_CONST from "@/constants/categories";
import { COMMONS_CONST } from "@/constants/commons";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useCategoryStore } from "@/store/useCategoryStore";
import { CategoryRequest } from "@/types/category.type";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCategory = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const { setModalUpdate } = useCategoryStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CategoryRequest }) => {
      return (await categoriesApi.update(id, data)).data;
    },
    onSuccess: (data) => {
      toastSuccess(CATEGORIES_CONST.UPDATE_SUCCESS);
      queryClient.refetchQueries({ queryKey: ["categories"] });
      setModalUpdate(false);
    },
    onError: (error: ErrorResponse) => {
      if (error.statusCode === 422) {
        toastError(COMMONS_CONST.ALREADY_NAME);
      } else {
        toastError(COMMONS_CONST.ERROR);
      }
    },
  });
};
