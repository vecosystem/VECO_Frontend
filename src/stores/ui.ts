// store/ui.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UIState = {
  // 사이드바 자체 토글
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // 드롭다운별 토글 (key: string → open: boolean)
  dropdownOpen: Record<string, boolean>;
  setDropdownOpen: (key: string, open: boolean) => void;
  toggleDropdown: (key: string) => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      dropdownOpen: {},
      setDropdownOpen: (key, open) =>
        set((s) => ({ dropdownOpen: { ...s.dropdownOpen, [key]: open } })),
      toggleDropdown: (key) =>
        set((s) => ({
          dropdownOpen: { ...s.dropdownOpen, [key]: !(s.dropdownOpen[key] ?? true) },
        })),
    }),
    {
      name: 'ui-prefs', // localStorage 키
      storage: createJSONStorage(() => localStorage),
      // 꼭 필요한 것만 저장
      partialize: (s) => ({ sidebarOpen: s.sidebarOpen, dropdownOpen: s.dropdownOpen }),
    }
  )
);
