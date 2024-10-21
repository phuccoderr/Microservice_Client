import ModalOrderDetail from "@/components/profile/modal-order-detail";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { useGetOrderMe } from "@/hooks/query-orders/useGetOrderMe";
import { useOrderStore } from "@/store/useOrderStore";
import { formatVnd } from "@/utils/common";
import React from "react";

interface TabOrderProps {
  value: string;
}

const TabOrder = (props: TabOrderProps) => {
  const { data: orders } = useGetOrderMe();
  const { setModalDetail } = useOrderStore();

  let total = 0;
  orders?.forEach((item) => {
    total += item.total;
  });

  const handleModalDetail = (id: string) => {
    setModalDetail(true, { _id: id });
  };

  return (
    <>
      <TabsContent
        value={props.value}
        className="flex w-full flex-col items-center gap-2"
      >
        <Table>
          <TableCaption>Danh sách sản phẩm bạn đã mua.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Mã hoá đơn</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Ngày thanh toán</TableHead>
              <TableHead>Trạng thái đơn hàng</TableHead>
              <TableHead className="text-right">Tổng tiền</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((item) => (
              <TableRow key={item.id}>
                <TableCell
                  onClick={() => handleModalDetail(item.id)}
                  className="cursor-pointer font-medium hover:text-sky-400"
                >
                  {item.id}
                </TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.phone_number}</TableCell>
                <TableCell>
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {item.status === "Pending" ? "Đang xuất bán" : "Hoàn thành"}
                </TableCell>
                <TableCell className="text-right">
                  {formatVnd(item.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Tổng tiền đã thanh toán</TableCell>
              <TableCell className="text-right">{formatVnd(total)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TabsContent>
      <ModalOrderDetail />
    </>
  );
};

export default TabOrder;
