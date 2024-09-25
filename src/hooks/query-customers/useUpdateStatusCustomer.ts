import customersApi from "@/api/customersApi";
import { CUSTOMER_CONST } from "@/constants/customers";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStatusCustomer = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: boolean }) => {
      await customersApi.updateStatus(id, status);
    },
    onSuccess: () => {
      toastSuccess(CUSTOMER_CONST.UPDATE_STATUS_SUCCESS);
      queryClient.refetchQueries({ queryKey: ["customers"] });
    },
    onError: (error) => {
      toastError(error.message);
    },
  });
};
