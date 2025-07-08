import { create } from 'zustand/react';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';

interface ModalContent {
  name: string;
}

interface ModalActions {
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
}

interface ModalState {
  isOpen: boolean;
  content: ModalContent | null;
  actions: ModalActions;
}

export const useModalStore = create(
  immer<ModalState>((set) => ({
    isOpen: false,
    content: null,
    actions: {
      openModal: (content) =>
        set((state) => {
          state.isOpen = true;
          state.content = content;
        }),
      closeModal: () =>
        set((state) => {
          state.isOpen = false;
          state.content = null;
        }),
    },
  }))
);

export const useModalInfo = () =>
  useModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      content: state.content,
    }))
  );

export const useModalActions = () => useModalStore((state) => state.actions);
