import { reviewsApi } from "@/api/reviewsApi";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useProductStore } from "@/store/useProductStore";
import { CreateRevew } from "@/types/review.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostReviews = () => {
  const { setModalReview } = useProductStore();
  const { toastSuccess } = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ proId, body }: { proId: string; body: CreateRevew }) => {
      return reviewsApi.postReview(proId, body);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["product", data.data] });
      queryClient.refetchQueries({ queryKey: ["ratings", data.data] });
      toastSuccess("Đánh giá thành công");
      setModalReview(false);
    },
    onError: () => {
      toastSuccess("Đánh giá thất bại");
    },
  });
};
