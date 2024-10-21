import { Customer } from "@/types/customer.type";
import { ColumnDef } from "@tanstack/react-table";
import ImageDefault from "@/public/images/product-empty.png";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useUpdateStatusCustomer } from "@/hooks/query-customers/useUpdateStatusCustomer";
import { useToastMessage } from "@/hooks/useToastMessage";
import { COMMONS_CONST } from "@/constants/commons";
import { useCustomerStore } from "@/store/useCustomerStore";
import { GiClick } from "react-icons/gi";
import { Label } from "@/components/ui/label";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ cell, row }) => {
      const { setModalView } = useCustomerStore();
      const { _id, email } = row.original;
      return (
        <Label
          className="flex cursor-pointer gap-2 hover:text-sky-600"
          onClick={() => setModalView(true, _id)}
        >
          {email}
          <GiClick />
        </Label>
      );
    },
  },
  {
    accessorKey: "avatar",
    header: "Ảnh đại diện",
    cell: ({ cell, row }) => {
      const { avatar } = row.original;
      return (
        <Image
          src={avatar || ImageDefault}
          className="rounded-xl"
          width={50}
          height={120}
          alt="Picture of the author"
        />
      );
    },
  },
  {
    accessorKey: "first_name",
    header: "Họ và tên",
    cell: ({ cell, row }) => {
      const { first_name, last_name } = row.original;
      return <h1>{first_name + " " + last_name}</h1>;
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ cell, row }) => {
      const { _id, status } = row.original;
      const mutate = useUpdateStatusCustomer();
      const { toastLoading } = useToastMessage();
      const handleUpdateStatus = () => {
        toastLoading(COMMONS_CONST.LOADING);
        mutate.mutate({ id: _id, status: !status });
      };
      return (
        <Switch
          checkedIcon={<FaCheck />}
          unCheckedIcon={<RxCross2 />}
          checked={status}
          onCheckedChange={handleUpdateStatus}
        />
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: "Số điện thoại",
    cell: ({ cell, row }) => {
      const { phone_number } = row.original;
      return phone_number ? <h1>{phone_number}</h1> : <h1>unknown</h1>;
    },
  },
];
