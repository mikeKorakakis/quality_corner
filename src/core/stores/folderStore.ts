import create from "zustand";

interface State {
  folders: string[];
  setFolders: (folders: string[]) => void;
}
export const useFolderStore = create<State>((set) => ({
  folders: [],
  setFolders: (folders: string[]) =>
    set((_) => ({folders})),
}));
