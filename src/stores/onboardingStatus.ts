import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type OnboardingStatusState = {
  workspaceCreated: boolean; // 생성 요청 성공 여부
  createdWorkspaceId?: string | number; // 선택: 서버가 준 id 저장
  setWorkspaceCreated: (v: boolean, id?: string | number) => void;
  resetWorkspaceCreated: () => void; // 선택: 다시 만들기 눌렀을 때 초기화용
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
