import { Discount } from "@/types/discount.type";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Discount>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Sự kiện giảm giá",
  },
  {
    accessorKey: "code",
    header: "Mã giảm giá",
  },
  {
    accessorKey: "expiry_date",
    header: "Hạn sử dụng",
  },
  {
    accessorKey: "sale",
    header: "% giảm",
  },
  {
    accessorKey: "quantity",
    header: "Số lượng sử dụng",
  },
];
