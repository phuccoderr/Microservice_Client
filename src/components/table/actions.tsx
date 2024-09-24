import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COMMONS_CONST } from "@/constants/commons";
import { TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";

interface ActionsProps {
  data: { id: string; [key: string]: any };
  setModalEdit: any;
  setModalDelete: any;
}

export default function Actions({
  data,
  setModalEdit,
  setModalDelete,
}: Readonly<ActionsProps>) {
  const handleEdit = () => {
    setModalEdit(true, { ...data });
  };

  const handleDelete = () => {
    setModalDelete(true, { ...data });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleEdit}>
          <FaPencilAlt className="mr-2 h-4 w-4" />
          <span>{COMMONS_CONST.EDIT}</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled={data.disabled} onClick={handleDelete}>
          <TrashIcon className="mr-2 h-4 w-4" />
          <span>{COMMONS_CONST.DELETE}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
