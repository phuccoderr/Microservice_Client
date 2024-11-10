import BadgeStatus from "@/components/badge-status";
import Actions from "@/components/table/actions";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Category } from "@/types/category.type";
import { ColumnDef } from "@tanstack/react-table";
import { TiArrowDownThick, TiArrowRightThick } from "react-icons/ti";

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
            {row.getIsExpanded() ? <TiArrowDownThick /> : <TiArrowRightThick />}
          </button>
        ) : (
          ""
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
      return <BadgeStatus status={status} />;
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
