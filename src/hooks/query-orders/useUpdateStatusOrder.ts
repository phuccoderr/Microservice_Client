import { ordersApi } from "@/api/ordersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStatusOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return (await ordersApi.updateStatus(id, status)).data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      return error;
    },
  });
};
