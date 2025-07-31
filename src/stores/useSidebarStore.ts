import { create } from 'zustand/react';
import { immer } from 'zustand/middleware/immer';

interface SidebarState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  immer((set) => ({
    isOpen: true,
    open: () =>
      set((state) => {
        state.isOpen = true;
      }),
    close: () =>
      set((state) => {
        state.isOpen = false;
      }),
    toggle: () =>
      set((state) => {
        state.isOpen = !state.isOpen;
      }),
  }))
);
