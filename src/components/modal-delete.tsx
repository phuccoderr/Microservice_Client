import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { COMMONS_CONST } from "@/constants/commons";
import { UseMutateFunction } from "@tanstack/react-query";
import React from "react";

interface ModalDeleteProps {
  id: string;
  title: string;
  description: string;
  name: string;
  openModal: boolean;
  setModal: (open: boolean, props?: { id: string; name: string }) => void;
  mutate: UseMutateFunction<any, Error, string, unknown>;
}

export default function ModalDelete(props: Readonly<ModalDeleteProps>) {
  const { title, description, id, name, openModal, setModal, mutate } = props;

  return (
    <Dialog open={openModal} onOpenChange={setModal}>
      <DialogContent className="bg-black sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description} {name}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => mutate(id)}
            variant="destructive"
            type="submit"
          >
            {COMMONS_CONST.DELETE}
          </Button>
          <Button
            variant="secondary"
            type="submit"
            onClick={() => setModal(false)}
          >
            {COMMONS_CONST.CANCEL}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
