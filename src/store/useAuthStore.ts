import { create } from "zustand";

type ModalState = {
  customerId: string;
};

interface ModalAction extends ModalState {
  setCustomerId: (customerId: string) => void;
}

export const useAuthStore = create<ModalAction>((set) => ({
  customerId: "",
  setCustomerId: (customerId: string) => set({ customerId }),
}));
