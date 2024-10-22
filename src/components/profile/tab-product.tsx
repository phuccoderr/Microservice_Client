import BadgeOrder from "@/components/badge-order";
import ButtonReview from "@/components/profile/button-review";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { useGetOrderMe } from "@/hooks/query-orders/useGetOrderMe";
import { calSale, formatDate, formatVnd } from "@/utils/common";
import Image from "next/image";
import React from "react";
import { MdOutlinePostAdd } from "react-icons/md";

interface TabProductProps {
  value: string;
}

const TabProduct = (props: TabProductProps) => {
  const { data: orders } = useGetOrderMe();

  return (
    <TabsContent
      value={props.value}
      className="flex w-full flex-col items-center gap-2"
    >
      <Table>
        <TableCaption>Danh sách sản phẩm bạn đã mua.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Tên sản phẩm</TableHead>
            <TableHead>Ảnh sản phẩm</TableHead>
            <TableHead>Giá tiền</TableHead>
            <TableHead>Ngày thanh toán</TableHead>
            <TableHead>Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) =>
            order?.order_details?.map((detail) => (
              <TableRow key={detail.id}>
                <TableCell>{detail.product.name}</TableCell>
                <TableCell>
                  <Image
                    width={50}
                    height={50}
                    className="h-[50px] rounded-xl"
                    src={detail.product.url}
                    alt={detail.product.name}
                  />
                </TableCell>
                <TableCell>{formatVnd(detail.total)}</TableCell>
                <TableCell>{formatDate(order.created_at)}</TableCell>
                <TableCell>
                  <BadgeOrder
                    status={order.status}
                    children={<ButtonReview id={detail.product.id} />}
                  />
                </TableCell>
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </TabsContent>
  );
};

export default TabProduct;
