import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 워크스페이스 생성 요청 이력 관리
type OnboardingStatusState = {
  workspaceCreated: boolean;
  createdWorkspaceId?: string | number;
  setWorkspaceCreated: (v: boolean, id?: string | number) => void;
  resetWorkspaceCreated: () => void;
};

export const useOnboardingStatus = create<OnboardingStatusState>()(
  persist(
    (set) => ({
      workspaceCreated: false,
      createdWorkspaceId: undefined,
      setWorkspaceCreated: (v, id) => set({ workspaceCreated: v, createdWorkspaceId: id }),
      resetWorkspaceCreated: () => set({ workspaceCreated: false, createdWorkspaceId: undefined }),
    }),
    {
      name: 'onboarding-status',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        workspaceCreated: s.workspaceCreated,
        createdWorkspaceId: s.createdWorkspaceId,
      }),
    }
  )
);
