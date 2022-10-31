import create from "zustand";

interface State {
  open: boolean;
  element: JSX.Element | null;
  openModal: (element: JSX.Element) => void;
  closeModal: () => void;
}
export const useModalStore = create<State>((set) => ({
  open: false,
  element: null,
  openModal: (element: JSX.Element) =>
    set(() => ({ open: true, element: element })),
  closeModal: () => set(() => ({ open: false, element: null })),
}));
