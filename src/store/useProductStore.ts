import { create } from "zustand";

type ModalState = {
  sheetUpdate: boolean;
  modalView: boolean;
  modalDelete: boolean;
  id: string;
  name: string;
  category_id: string;
};

type ProductInfo = Pick<ModalState, "id" | "name">;
type ProductInfoWithCategory = Pick<ModalState, "id" | "name" | "category_id">;

export interface ModalStore extends ModalState {
  setSheetUpdate: (open: boolean, props?: ProductInfoWithCategory) => void;
  setModalView: (open: boolean, props?: ProductInfoWithCategory) => void;
  setModalDelete: (open: boolean, props?: ProductInfo) => void;
}

export const useProductStore = create<ModalStore>((set) => ({
  sheetUpdate: false,
  modalView: false,
  modalDelete: false,
  id: "",
  name: "",
  category_id: "",
  setSheetUpdate: (open: boolean, props?: ProductInfoWithCategory) => {
    if (open) {
      return set({ sheetUpdate: open, ...props });
    }
    return set({ sheetUpdate: open });
  },
  setModalView: (open: boolean, props?: ProductInfoWithCategory) => {
    const { id, name, category_id } = props || {};
    if (open) {
      return set({ modalView: open, id, name, category_id });
    }
    return set({
      modalView: open,
    });
  },
  setModalDelete: (open: boolean, props?: ProductInfo) => {
    const { id, name } = props || {};
    if (open) {
      return set({ modalDelete: open, id, name });
    }
    return set({
      modalDelete: open,
    });
  },
}));
