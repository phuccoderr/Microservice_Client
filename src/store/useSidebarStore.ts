import { create } from "zustand";

type ModalState = {
  open: boolean;
};

interface ModalStore extends ModalState {
  setOpen: (open: boolean) => void;
}

export const useSidebarStore = create<ModalStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => {
    set({ open });
  },
}));
