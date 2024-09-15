import Actions from "@/components/table/actions";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { COMMONS_CONST } from "@/constants/commons";
import { useToastMessage } from "@/hook/useToastMessage";
import { useUpdateUserStatus } from "@/hook/useUpdateStatusUser";
import { User } from "@/types/users.type";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "Id",
    size: 200,
    minSize: 100,
    maxSize: 300,
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
      return (
        <Actions
          id={row.original._id}
          name={row.original.name}
          email={row.original.email}
        />
      );
    },
  },
];
