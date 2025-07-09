import { create } from 'zustand/react';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';

interface DropdownContent {
  name: string;
}

interface DropdownActions {
  openDropdown: (content: DropdownContent) => void;
  closeDropdown: () => void;
}

interface DropdownState {
  isOpen: boolean;
  content: DropdownContent | null;
  actions: DropdownActions;
}

export const useDropdownStore = create(
  immer<DropdownState>((set) => ({
    isOpen: false,
    content: null,
    actions: {
      openDropdown: (content) =>
        set((state) => {
          state.isOpen = true;
          state.content = content;
        }),
      closeDropdown: () =>
        set((state) => {
          state.isOpen = false;
          state.content = null;
        }),
    },
  }))
);

export const useDropdownInfo = () =>
  useDropdownStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      content: state.content,
    }))
  );

export const useDropdownActions = () => useDropdownStore((state) => state.actions);
