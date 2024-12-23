import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/types/order.type";
import { useOrderStore } from "@/store/useOrderStore";
import { formatDate, formatVnd } from "@/utils/common";
import { Label } from "@/components/ui/label";
import { GiClick } from "react-icons/gi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORDERS_CONST } from "@/constants/orders";
import { useUpdateStatusOrder } from "@/hooks/query-orders/useUpdateStatusOrder";
import { productSocket } from "@/api/socket";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const { setModalDetail } = useOrderStore();
      const handleModalDetail = () => {
        setModalDetail(true, { _id: row.original.id });
      };
      const { email } = row.original;
      return (
        <Label
          onClick={handleModalDetail}
          className="flex cursor-pointer gap-2 hover:text-sky-600"
        >
          {email}
          <GiClick />
        </Label>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
  },
  {
    accessorKey: "phone_number",
    header: "Số điện thoại",
  },
  {
    accessorKey: "created_at",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const { created_at } = row.original;
      return <h1>{formatDate(created_at)}</h1>;
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const { id, status } = row.original;
      const mutation = useUpdateStatusOrder();
      const handleSelect = (value: string) => {
        mutation.mutate(
          { id, status: value },
          {
            onSuccess: () => {
              productSocket.emit("order-status", row.original.email);
            },
          },
        );
      };
      return (
        <Select onValueChange={handleSelect} value={status}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn quá trình đơn hàng" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="pending">{ORDERS_CONST.PENDING}</SelectItem>
              <SelectItem value="complete">{ORDERS_CONST.COMPLETE}</SelectItem>
              <SelectItem value="cancel">{ORDERS_CONST.CANCEL}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Tổng tiền",
    cell: ({ row }) => {
      const { total } = row.original;
      return <h1>{formatVnd(total)}</h1>;
    },
  },
];
