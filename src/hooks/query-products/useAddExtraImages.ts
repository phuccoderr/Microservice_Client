import { productsApi } from "@/api/productsApi";
import { COMMONS_CONST } from "@/constants/commons";
import { PRODUCT_CONST } from "@/constants/products";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddExtraImages = () => {
  const { toastError } = useToastMessage();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: File[] }) => {
      return (await productsApi.addExtraImages(id, data)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["product", data] });
      queryClient.refetchQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toastError(COMMONS_CONST.ERROR);
    },
  });
};
