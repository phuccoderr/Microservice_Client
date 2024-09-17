import { Category } from "@/types/category.type";
import { create } from "zustand";

type ModalState = {
  modalCategory: boolean;
  modalCategoryDelete: boolean;
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
  setModalCategory: (open: boolean, props?: any) => void;
  setModalCategoryDelete: (open: boolean, props?: any) => void;
  setListCategory: (listCategory: Category[]) => void;
}

const useModalCategory = create<ModalCategoryStore>((set) => ({
  modalCategory: false,
  modalCategoryDelete: false,
  id: "",
  name: "",
  status: false,
  parent_id: "",
  listCategory: [],
  setModalCategory: (open: boolean, props?: any) => {
    const { id, name, status, parent_id } = props || {};
    if (open) {
      return set({ modalCategory: true, id, name, status, parent_id });
    }
    return set({
      modalCategory: false,
      id: "",
      name: "",
      status: false,
      parent_id: "",
    });
  },
  setModalCategoryDelete: (open: boolean, props?: any) => {
    const { id, name, status, parent_id } = props || {};
    if (open) {
      return set({ modalCategoryDelete: true, id, name, status, parent_id });
    }
    return set({
      modalCategoryDelete: false,
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

export default useModalCategory;
