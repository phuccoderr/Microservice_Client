import { usersApi } from "@/api/usersApi";
import { USER_CONST } from "@/constants/users";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useUserStore } from "@/store/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const { setModalDelete } = useUserStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return (await usersApi.delete(id)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["users"] });
      toastSuccess(USER_CONST.DELETE_USER_SUCCESS);
      setModalDelete(false);
    },
    onError: (error) => {
      toastError("Bạn không có quyền truy cập chức năng này");
    },
  });
};
