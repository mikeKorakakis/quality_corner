import create from "zustand";

interface State {
  libraries: string[];
  setLibraries: (libraries: string[]) => void;
}
export const useLibraryStore = create<State>((set) => ({
  libraries: [],
  setLibraries: (libraries: string[]) =>
    set((_) => ({libraries})),
}));
