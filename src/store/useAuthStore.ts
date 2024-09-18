import { create } from "zustand";

type ModalState = {
  isAuth: boolean;
};

interface ModalAction extends ModalState {
  setIsAuth: (isAuth: boolean) => void;
}

export const useAuthStore = create<ModalAction>((set) => ({
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set({ isAuth }),
}));
