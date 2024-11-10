import { reviewsApi } from "@/api/reviewsApi";
import { REVIEWS_CONST } from "@/constants/reviews";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useReviewStore } from "@/store/useReviewStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteReview = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const { setModalDelete } = useReviewStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return (await reviewsApi.delete(id)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["reviews"] });
      toastSuccess(REVIEWS_CONST.DELETE_SUCCESS);
      setModalDelete(false);
    },
    onError: (error) => {
      toastError(error.message);
    },
  });
};
