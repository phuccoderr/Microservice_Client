import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useModalStore from "@/store/useModalStore";
import { TrashIcon } from "@radix-ui/react-icons";
import { FaPencilAlt } from "react-icons/fa";

interface ActionsProps {
  id: string;
  name: string;
  email: string;
}

export default function Actions({ id, name, email }: Readonly<ActionsProps>) {
  const { setModalUser, setModalUserDelete } = useModalStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => setModalUser(true, { id, name, email })}
        >
          <FaPencilAlt className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setModalUserDelete(true, { id, name })}
        >
          <TrashIcon className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
