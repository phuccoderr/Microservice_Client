import { Category } from "@/types/category.type";
import { create } from "zustand";

type ModalState = {
  modalUpdate: boolean;
  modalDelete: boolean;
  id: string;
  name: string;
  status: boolean;
  parent_id: string;
  listCategory: ListCategory[];
};

type ListCategory = {
  id: string;
  name: string;
};

interface ModalCategoryStore extends ModalState {
  setModalUpdate: (open: boolean, props?: any) => void;
  setModalDelete: (open: boolean, props?: any) => void;
  setListCategory: (listCategory: Category[]) => void;
}

export const useCategoryStore = create<ModalCategoryStore>((set) => ({
  modalUpdate: false,
  modalDelete: false,
  id: "",
  name: "",
  status: false,
  parent_id: "",
  listCategory: [],
  setModalUpdate: (open: boolean, props?: any) => {
    const { id, name, status, parent_id } = props || {};
    if (open) {
      return set({ modalUpdate: true, id, name, status, parent_id });
    }
    return set({
      modalUpdate: false,
      id: "",
      name: "",
      status: false,
      parent_id: "",
    });
  },
  setModalDelete: (open: boolean, props?: any) => {
    const { id, name, status, parent_id } = props || {};
    if (open) {
      return set({ modalDelete: true, id, name, status, parent_id });
    }
    return set({
      modalDelete: false,
      id: "",
      name: "",
      status: false,
      parent_id: "",
    });
  },
  setListCategory: (category: Category[]) => {
    const newData: ListCategory[] = [];
    const hierachical = (children: Category[], newData: ListCategory[]) => {
      if (children.length > 0) {
        children.forEach((item) => {
          newData.push({
            id: item.id,
            name: item.name,
          });
          hierachical(item.children, newData);
        });
      }
    };
    category.forEach((item) => {
      newData.push({
        id: item.id,
        name: item.name,
      });
      hierachical(item.children, newData);
    });
    set({ listCategory: newData });
  },
}));
