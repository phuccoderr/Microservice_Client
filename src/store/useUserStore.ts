import { create } from "zustand";

type ModalState = {
  modalUpdate: boolean;
  modalDelete: boolean;
  id: string;
  name: string;
  email: string;
};

type UserInfo = Omit<ModalState, "modalCreate" | "modalUpdate" | "modalDelete">;
type UserInfoWithoutEmail = Omit<UserInfo, "email">;

export interface ModalStore extends ModalState {
  setModalUpdate: (open: boolean, props?: UserInfo) => void;
  setModalDelete: (open: boolean, props?: UserInfoWithoutEmail) => void;
}

export const useUserStore = create<ModalStore>((set) => ({
  modalCreate: false,
  modalUpdate: false,
  modalDelete: false,
  id: "",
  name: "",
  email: "",
  setModalUpdate: (open: boolean, props?: UserInfo) => {
    const { id, name, email } = props || {};
    if (open) {
      return set({ modalUpdate: open, id, name, email });
    }
    return set({ modalUpdate: open, id: "", name: "", email: "" });
  },
  setModalDelete: (open: boolean, props?: UserInfoWithoutEmail) => {
    const { id, name } = props || {};
    if (open) {
      return set({ modalDelete: open, id, name });
    }
    return set({ modalDelete: open, id: "" });
  },
}));
