import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useModalStore from "@/store/useModalStore";
import { USER_CONST } from "@/constants/users";
import { COMMONS_CONST } from "@/constants/commons";
import { useUpdateUser } from "@/hook/useUpdateUser";
import { useToastMessage } from "@/hook/useToastMessage";
import { useState } from "react";

export default function ModalUpdateUser() {
  const { modalUser, name, id, email, setModalUser } = useModalStore();
  const { toastLoading } = useToastMessage();
  const { mutate } = useUpdateUser();
  const [updateName, setUpdateName] = useState<string>(name);

  const handleUpdateUser = () => {
    toastLoading(COMMONS_CONST.LOADING);
    mutate({ _id: id, name: updateName });
  };

  return (
    <Dialog open={modalUser} onOpenChange={setModalUser}>
      <DialogContent className="bg-black sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {USER_CONST.UPDATE_PROFILE}: {email}
          </DialogTitle>
          <DialogDescription>{USER_CONST.CHANGE_NAME}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {COMMONS_CONST.NAME}
            </Label>
            <Input
              id="name"
              defaultValue={name}
              onChange={(e) => setUpdateName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdateUser} type="submit">
            {COMMONS_CONST.SAVE}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
