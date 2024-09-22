import Actions from "@/components/table/actions";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { COMMONS_CONST } from "@/constants/commons";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useUpdateUserStatus } from "@/hooks/query-users/useUpdateStatusUser";
import { User } from "@/types/users.type";
import { ColumnDef } from "@tanstack/react-table";
import { useUserStore } from "@/store/useUserStore";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ cell, row }) => {
      const { status, _id } = row.original;
      const updateUserStatusMutation = useUpdateUserStatus();
      const { toastLoading } = useToastMessage();

      const handleChange = () => {
        toastLoading(COMMONS_CONST.LOADING);
        updateUserStatusMutation.mutate({
          id: _id,
          status: !status,
        });
      };

      return (
        <Checkbox
          disabled={updateUserStatusMutation.isPending}
          onClick={handleChange}
          checked={status}
        />
      );
    },
  },
  {
    accessorKey: "roles",
    header: "Quyền",
    cell: ({ cell, row }) => {
      return row.original.roles?.map((role) => (
        <Badge key={role}>{role}</Badge>
      ));
    },
  },
  {
    accessorKey: "action",
    header: "Thao tác",
    cell: ({ cell, row }) => {
      const { setModalUpdate, setModalDelete } = useUserStore();
      const { _id, name, email } = row.original;
      return (
        <Actions
          data={{ id: _id, name, email }}
          setModalEdit={setModalUpdate}
          setModalDelete={setModalDelete}
        />
      );
    },
  },
];
