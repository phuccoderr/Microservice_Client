import { mailsApi } from "@/api/mailsApi";
import { useToastMessage } from "@/hooks/useToastMessage";
import { Feedback } from "@/types/feedback.type";
import { useMutation } from "@tanstack/react-query";

export const useSendFeedback = () => {
  const { toastSuccess, toastError } = useToastMessage();
  return useMutation({
    mutationFn: async (data: Feedback) => {
      return (await mailsApi.sendMail(data)).data;
    },
    onSuccess: (data) => {
      toastSuccess("Gửi phản hồi thành công");
    },
    onError: (error) => {
      toastError("Gửi phản hồi thất bại");
    },
  });
};
