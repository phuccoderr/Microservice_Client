import { create } from "zustand";

type ModalState = {
  sheetUpdate: boolean;
  modalView: boolean;
  modalDelete: boolean;
  id: string;
  name: string;
  image_id: string;
};

type ProductInfo = Pick<ModalState, "id" | "name">;

export interface ModalStore extends ModalState {
  setSheetUpdate: (open: boolean) => void;
  setModalView: (open: boolean, props?: ProductInfo) => void;
  setModalDelete: (open: boolean, props?: ProductInfo) => void;
}

export const useProductStore = create<ModalStore>((set) => ({
  sheetUpdate: false,
  modalView: false,
  modalDelete: false,
  id: "",
  name: "",
  image_id: "",
  setSheetUpdate: (open: boolean) => {
    if (open) {
      return set({ sheetUpdate: open });
    }
    return set({ sheetUpdate: open });
  },
  setModalView: (open: boolean, props?: ProductInfo) => {
    const { id, name } = props || {};
    if (open) {
      return set({ modalView: open, id, name });
    }
    return set({
      modalView: open,
      id: "",
      name: "",
    });
  },
  setModalDelete: (open: boolean, props?: ProductInfo) => {
    const { id, name } = props || {};
    if (open) {
      return set({ modalDelete: open, id, name });
    }
    return set({
      modalDelete: open,
      id: "",
      name: "",
    });
  },
}));
