import { usersApi } from "@/api/usersApi";
import { USER_CONST } from "@/constants/users";
import { useToastMessage } from "@/hook/useToastMessage";
import useModalStore from "@/store/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const { setModalUserDelete } = useModalStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return (await usersApi.delete(id)).data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toastSuccess(USER_CONST.DELETE_USER_SUCCESS);
      setModalUserDelete(false);
    },
    onError: (error) => {
      toastError(error.message);
    },
  });
};
