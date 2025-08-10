import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  dropdownOpen: Record<string, boolean>;
  setDropdownOpen: (key: string, open: boolean) => void;
  toggleDropdown: (key: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    immer((set) => ({
      sidebarOpen: true,
      toggleSidebar: () =>
        set((s) => {
          s.sidebarOpen = !s.sidebarOpen;
        }),

      dropdownOpen: {},
      setDropdownOpen: (key, open) =>
        set((s) => {
          s.dropdownOpen[key] = open;
        }),
      toggleDropdown: (key) =>
        set((s) => {
          s.dropdownOpen[key] = !(s.dropdownOpen[key] ?? true);
        }),
    })),
    {
      name: 'ui-prefs',
      partialize: (s) => ({
        sidebarOpen: s.sidebarOpen,
        dropdownOpen: s.dropdownOpen,
      }),
    }
  )
);
