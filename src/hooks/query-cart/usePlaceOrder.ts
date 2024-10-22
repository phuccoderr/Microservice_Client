import { cartsApi } from "@/api/cartsApi";
import { ORDERS_CONST } from "@/constants/orders";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePlaceOrder = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: {
      payment_method: string;
      address: string;
      phone_number: string;
      note: string;
      sale: number;
    }) => {
      return (await cartsApi.placeOrder(body)).data;
    },
    onSuccess: (data) => {
      toastSuccess(ORDERS_CONST.PLACE_ORDER_SUCCESS);
      queryClient.refetchQueries({ queryKey: ["cart"] });
      router.push("/thanks");
    },
    onError: (error) => {
      toastError(ORDERS_CONST.PLACE_ORDER_FAIL);
      return error;
    },
  });
};
