import { create } from "zustand";

type ModalState = {
  id: string;
  modalView: boolean;
};

interface ModalAction extends ModalState {
  setModalView: (open: boolean, id?: string) => void;
}

export const useCustomerStore = create<ModalAction>((set) => ({
  id: "",
  modalView: false,
  setModalView: (open, id) => {
    set({ modalView: open, id });
  },
}));
