import { Discount } from "@/types/discount.type";
import { create } from "zustand";

type ModalState = {
  id: string;
  name: string;
  modalDelete: boolean;
};

type DiscountInfo = Pick<ModalState, "id" | "name">;

interface ModalAction extends ModalState {
  setModalDelete: (open: boolean, props?: DiscountInfo) => void;
}

export const useDiscountStore = create<ModalAction>((set) => ({
  id: "",
  name: "",
  modalDelete: false,
  setModalDelete: (open: boolean, props?: DiscountInfo) =>
    set({ modalDelete: open, ...props }),
}));
