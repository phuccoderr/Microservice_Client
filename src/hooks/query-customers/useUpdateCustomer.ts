import { CUSTOMER_CONST } from "@/constants/customers";
import customersApi from "@/api/customersApi";
import { useToastMessage } from "@/hooks/useToastMessage";
import { UpdateCustomer } from "@/types/customer.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToastMessage();

  return useMutation({
    mutationFn: async (data: UpdateCustomer) => {
      return (await customersApi.update(data)).data;
    },
    onSuccess: (data) => {
      toastSuccess(CUSTOMER_CONST.UPDATE_SUCCESS);
      queryClient.refetchQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      toastError(CUSTOMER_CONST.UPDATE_FAIL);
      return error;
    },
  });
};
