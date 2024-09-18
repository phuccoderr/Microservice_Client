import categoriesApi from "@/api/categoriesApi";
import CATEGORIES_CONST from "@/constants/categories";
import { COMMONS_CONST } from "@/constants/commons";
import { useToastMessage } from "@/hook/useToastMessage";
import { CategoryRequest } from "@/types/category.type";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";

export const useCreateCategory = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CategoryRequest) => {
      return (await categoriesApi.create(data)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["categories"] });
      toastSuccess(CATEGORIES_CONST.CREATE_SUCCESS);
      router.push("/admin/categories");
    },
    onError: (error: ErrorResponse) => {
      console.log("error", error);
      if (error.statusCode === 422) {
        toastError(CATEGORIES_CONST.NAME_ALREADY);
      } else {
        toastError(COMMONS_CONST.ERROR);
      }
    },
  });
};
