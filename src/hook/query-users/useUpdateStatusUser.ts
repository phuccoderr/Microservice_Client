import { usersApi } from "@/api/usersApi";
import { USER_CONST } from "@/constants/users";
import { useToastMessage } from "@/hook/useToastMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserStatus = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: boolean }) => {
      return (await usersApi.updateStatus({ id: id, status: status })).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["users"] });
      toastSuccess(USER_CONST.UPDATE_STATUS_SUCESS);
    },
    onError: (error) => {
      toastError(error.message);
    },
  });
};
