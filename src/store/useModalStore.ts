import { create } from "zustand";

type ModalState = {
  modalUser: boolean;
  modalUserDelete: boolean;
  id: string;
  name: string;
  email: string;
};

type UserInfo = Omit<ModalState, "modalUser" | "modalUserDelete">;
type UserInfoWithoutEmail = Omit<
  ModalState,
  "modalUser" | "modalUserDelete" | "email"
>;

export interface ModalStore extends ModalState {
  setModalUser: (open: boolean, props?: UserInfo) => void;
  setModalUserDelete: (open: boolean, props?: UserInfoWithoutEmail) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modalUser: false,
  modalUserDelete: false,
  id: "",
  name: "",
  email: "",
  setModalUser: (open: boolean, props?: UserInfo) => {
    const { id, name, email } = props || {};
    if (open) {
      return set({ modalUser: open, id, name, email });
    }
    return set({ modalUser: open, id: "", name: "", email: "" });
  },
  setModalUserDelete: (open: boolean, props?: UserInfoWithoutEmail) => {
    const { id, name } = props || {};
    if (open) {
      return set({ modalUserDelete: open, id, name });
    }
    return set({ modalUserDelete: open, id: "" });
  },
}));

export default useModalStore;
