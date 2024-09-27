import customersApi from "@/api/customersApi";
import { AUTH_CONST } from "@/constants/auth";
import { COMMONS_CONST } from "@/constants/commons";
import { useToastMessage } from "@/hooks/useToastMessage";
import { ErrorResponse } from "@/types/error.type";
import { Register } from "@/types/register.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRegisterCustomer = () => {
  const { toastSuccess } = useToastMessage();
  const router = useRouter();

  return useMutation({
    mutationFn: async (param: Register) => {
      return (await customersApi.register(param)).data;
    },
    onSuccess: (data) => {
      toastSuccess(AUTH_CONST.LOGIN_SUCCESS);
      router.push("/verify");
    },
    onError: (error: ErrorResponse) => {
      if (error.statusCode === 422) {
        toastSuccess(AUTH_CONST.ALREADY_EMAIL);
      } else {
        toastSuccess(COMMONS_CONST.ERROR);
      }
    },
  });
};
