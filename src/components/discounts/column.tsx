import { Button } from "@/components/ui/button";
import { useDiscountStore } from "@/store/useDiscountStore";
import { Discount } from "@/types/discount.type";
import { ColumnDef } from "@tanstack/react-table";
import { BiTrashAlt } from "react-icons/bi";

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
  {
    accessorKey: "",
    header: "Thao tác",
    cell: ({ row }) => {
      const { id, name } = row.original;
      const { setModalDelete } = useDiscountStore();

      return (
        <Button
          onClick={() => setModalDelete(true, { id, name })}
          variant={"destructive"}
          size={"icon"}
        >
          <BiTrashAlt />
        </Button>
      );
    },
  },
];
