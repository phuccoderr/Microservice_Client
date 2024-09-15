import { usersApi } from "@/api/usersApi";
import { USER_CONST } from "@/constants/users";
import { useToastMessage } from "@/hook/useToastMessage";
import useModalStore from "@/store/useModalStore";
import { UpdateUser } from "@/types/users.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const { setModalUser } = useModalStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateUser) => {
      return (await usersApi.updateUser(data)).data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toastSuccess(USER_CONST.UPDATE_USER_SUCESS);
      setModalUser(false);
    },
    onError: (error) => {
      toastError(error.message);
    },
  });
};
