import { usersApi } from "@/api/usersApi";
import { USER_CONST } from "@/constants/users";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useUserStore } from "@/store/useUserStore";
import { UpdateUser } from "@/types/users.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const { setModalUpdate } = useUserStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateUser) => {
      return (await usersApi.updateUser(data)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["users"] });
      toastSuccess(USER_CONST.UPDATE_USER_SUCESS);
      setModalUpdate(false);
    },
    onError: (error) => {
      toastError(USER_CONST.NOT_EMPTY);
    },
  });
};
