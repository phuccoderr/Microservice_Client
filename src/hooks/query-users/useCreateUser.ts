import { usersApi } from "@/api/usersApi";
import { COMMONS_CONST } from "@/constants/commons";
import { USER_CONST } from "@/constants/users";
import { useToastMessage } from "@/hooks/useToastMessage";
import { ErrorResponse } from "@/types/error.type";
import { CreateUser } from "@/types/users.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateUser = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateUser) => {
      return (await usersApi.create(data)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["users"] });
      toastSuccess(USER_CONST.CREATE_SUCCESS);
      router.back();
    },
    onError: (error: ErrorResponse) => {
      if (error.statusCode === 422) {
        toastError(USER_CONST.EMAIL_ALREADY);
      } else {
        toastError(COMMONS_CONST.ERROR);
      }
    },
  });
};
