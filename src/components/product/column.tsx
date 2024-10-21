import Actions from "@/components/table/actions";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product.type";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ImageDefault from "@/public/images/product-empty.png";
import { useProductStore } from "@/store/useProductStore";
import BadgeStatus from "@/components/badge-status";
import { GiClick } from "react-icons/gi";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ cell, row }) => {
      const { setModalView } = useProductStore();
      const { name, id, category_id } = row.original;
      return (
        <h1
          className="cursor-pointer"
          onClick={() => setModalView(true, { id, name, category_id })}
        >
          {name}
          <GiClick />
        </h1>
      );
    },
  },
  {
    accessorKey: "url",
    header: "Ảnh",
    cell: ({ cell, row }) => {
      const { url } = row.original;
      return (
        <Image
          src={url || ImageDefault}
          className="h-[50px] rounded-xl"
          width={50}
          height={50}
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
      return <BadgeStatus status={status} />;
    },
  },
  {
    accessorKey: "action",
    header: "Thao tác",
    cell: ({ cell, row }) => {
      const { setModalDelete, setSheetUpdate } = useProductStore();
      const { id, name, category_id } = row.original;
      return (
        <Actions
          data={{ id, name, category_id }}
          setModalEdit={setSheetUpdate}
          setModalDelete={setModalDelete}
        />
      );
    },
  },
];
