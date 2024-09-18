import Actions from "@/components/table/actions";
import { Badge } from "@/components/ui/badge";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Category } from "@/types/category.type";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ row, getValue }) => (
      <div>
        {row.getCanExpand() ? (
          <button
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer" },
            }}
          >
            {row.getIsExpanded() ? "👇" : "👉"}
          </button>
        ) : (
          "🔵"
        )}{" "}
        {getValue<boolean>()}
      </div>
    ),
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
      const { setModalUpdate, setModalDelete } = useCategoryStore();
      const { id, name, parent_id, status, has_children } = row.original;

      return (
        <Actions
          data={{ id, name, parent_id, status, disabled: has_children }}
          setModalEdit={setModalUpdate}
          setModalDelete={setModalDelete}
        />
      );
    },
  },
];
