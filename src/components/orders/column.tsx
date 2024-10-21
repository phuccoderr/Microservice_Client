import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/types/order.type";
import { useOrderStore } from "@/store/useOrderStore";
import { formatDate, formatVnd } from "@/utils/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GiClick } from "react-icons/gi";

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
    header: "Address",
  },
  {
    accessorKey: "phone_number",
    header: "Phone number",
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const { created_at } = row.original;
      return <h1>{formatDate(created_at)}</h1>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return <Badge>{status}</Badge>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const { total } = row.original;
      return <h1>{formatVnd(total)}</h1>;
    },
  },
];
