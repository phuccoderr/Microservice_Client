import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetOrder } from "@/hooks/query-orders/useGetOrder";
import { useOrderStore } from "@/store/useOrderStore";
import { calSale, formatVnd } from "@/utils/common";
import React from "react";

function ModalOrderDetail() {
  const { modalDetail, setModalDetail, _id } = useOrderStore();

  const { data: order } = useGetOrder(_id);

  return (
    <Dialog open={modalDetail} onOpenChange={setModalDetail}>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Chi tiết hoá đơn: {_id}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {order?.order_details?.map((item) => (
            <div key={item.id} className="flex items-center gap-4 text-sm">
              <img
                src={item.product.url}
                className="h-[75px] rounded-lg border"
                alt="error"
                width={75}
              />
              <div className="flex flex-col gap-2">
                <h1>{item.product.name}</h1>
                <h1>Số lượng: {item.quantity}</h1>
                <h1 className="">
                  Giá tiền:{" "}
                  {formatVnd(calSale(item.product.price, item.product.sale))}
                </h1>
              </div>
              <div className="ml-auto">
                Tổng tiền:{" "}
                {formatVnd(
                  calSale(item.product.price, item.product.sale) *
                    item.quantity,
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModalOrderDetail;
