import { create } from "zustand";

type ModalState = {
  modalView: boolean;
  modalDelete: boolean;
  id: string;
  name: string;
  image_id: string;
};

type ProductInfo = Omit<ModalState, "modalView" | "modalDelete">;

export interface ModalStore extends ModalState {
  setModalView: (open: boolean, props?: ProductInfo) => void;
  setModalDelete: (open: boolean, props?: ProductInfo) => void;
}

export const useProductStore = create<ModalStore>((set) => ({
  modalView: false,
  modalDelete: false,
  id: "",
  name: "",
  image_id: "",
  setModalView: (open: boolean, props?: ProductInfo) => {
    const { id, name, image_id } = props || {};
    if (open) {
      return set({ modalView: open, id, name, image_id });
    }
    return set({
      modalView: open,
      id: "",
      name: "",
      image_id: "",
    });
  },
  setModalDelete: (open: boolean, props?: ProductInfo) => {
    const { id, name, image_id } = props || {};
    if (open) {
      return set({ modalDelete: open, id, name, image_id });
    }
    return set({
      modalDelete: open,
      id: "",
      name: "",
      image_id: "",
    });
  },
}));
