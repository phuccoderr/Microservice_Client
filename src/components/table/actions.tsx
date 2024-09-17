import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useModalCategory from "@/store/useModalCategory";
import { TrashIcon } from "@radix-ui/react-icons";
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setModalEdit(true, { ...data })}>
          <FaPencilAlt className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={data.disabled}
          onClick={() => setModalDelete(true, { ...data })}
        >
          <TrashIcon className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
