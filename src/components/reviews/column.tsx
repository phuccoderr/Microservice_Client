import Actions from "@/components/table/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaStar } from "react-icons/fa";
import { useReviewStore } from "@/store/useReviewStore";
import { Review } from "@/types/review.type";
import { ColumnDef } from "@tanstack/react-table";
import { AiOutlineDelete } from "react-icons/ai";
import { GiClick } from "react-icons/gi";

export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ cell, row }) => {
      const { id, name } = row.original;
      const { setModalView } = useReviewStore();
      return (
        <Label
          onClick={() => setModalView(true, id)}
          className="flex cursor-pointer gap-2 hover:text-sky-600"
        >
          {name}
          <GiClick />
        </Label>
      );
    },
  },
  {
    accessorKey: "product_id",
    header: "Id sản phẩm",
  },
  {
    accessorKey: "rating",
    header: "Đánh giá",
    cell: ({ cell, row }) => {
      const { rating } = row.original;
      return (
        <div className="flex items-center gap-2">
          {rating} <FaStar />
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Ngày đánh giá",
    cell: ({ cell, row }) => {
      const { created_at } = row.original;
      return (
        <div>
          {new Date(created_at).toLocaleDateString("vi-VN", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Thao tác",
    cell: ({ cell, row }) => {
      const { setModalDelete } = useReviewStore();
      const { id, name } = row.original;
      return (
        <Button
          size={"icon"}
          variant={"destructive"}
          className="cursor-pointer"
          onClick={() => setModalDelete(true, { id, name })}
        >
          <AiOutlineDelete className="h-5 w-5" />
        </Button>
      );
    },
  },
];
