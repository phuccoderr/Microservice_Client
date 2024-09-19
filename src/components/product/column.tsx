import Actions from "@/components/table/actions";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product.type";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ImageDefault from "@/public/images/product-empty.png";
import { useProductStore } from "@/store/useProductStore";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "url",
    header: "Ảnh",
    cell: ({ cell, row }) => {
      const { url } = row.original;
      return (
        <Image
          src={url || ImageDefault}
          className="rounded-xl"
          width={50}
          height={120}
          alt="Picture of the author"
        />
      );
    },
  },
  {
    accessorKey: "average_rating",
    header: "Đánh giá",
  },
  {
    accessorKey: "review_count",
    header: "Số lượng khách hàng đánh giá",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ cell, row }) => {
      const { status } = row.original;
      return <Badge>{status ? "Hoạt động" : "Không hoạt động"}</Badge>;
    },
  },
  {
    accessorKey: "action",
    header: "Thao tác",
    cell: ({ cell, row }) => {
      const { setModalDelete } = useProductStore();
      const { id, name } = row.original;
      return (
        <Actions
          data={{ id, name }}
          routeEdit="/admin/products/edit"
          setModalDelete={setModalDelete}
        />
      );
    },
  },
];
