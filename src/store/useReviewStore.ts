import { create } from "zustand";

type ModalState = {
  id: string;
  name: string;
  modalView: boolean;
  modalDelete: boolean;
};

type InfoReview = Pick<ModalState, "id" | "name">;

interface ModalAction extends ModalState {
  setModalView: (open: boolean, id?: string) => void;
  setModalDelete: (open: boolean, props?: InfoReview) => void;
}

export const useReviewStore = create<ModalAction>((set) => ({
  id: "",
  name: "",
  modalView: false,
  modalDelete: false,

  setModalView: (open, id) => {
    if (open) return set({ modalView: open, id });
    return set({ modalView: open });
  },

  setModalDelete: (open: boolean, props?: InfoReview) =>
    set({ modalDelete: open, ...props }),
}));
