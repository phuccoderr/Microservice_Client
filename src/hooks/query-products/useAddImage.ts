import { productsApi } from "@/api/productsApi";
import { COMMONS_CONST } from "@/constants/commons";
import { PRODUCT_CONST } from "@/constants/products";
import { useToastMessage } from "@/hooks/useToastMessage";
import { DataResponse } from "@/types/response.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddImage = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: File }) => {
      return (await productsApi.addImage(id, data)).data;
    },
    onSuccess: (data: DataResponse) => {
      queryClient.refetchQueries({ queryKey: ["product", data] });
      queryClient.refetchQueries({ queryKey: ["products"] });
      toastSuccess(PRODUCT_CONST.FILE_UPLOAD_SUCCESS);
    },
    onError: (error) => {
      toastError(COMMONS_CONST.ERROR);
    },
  });
};
