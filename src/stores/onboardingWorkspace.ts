import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type WSState = {
  workspaceName: string;
  workspaceUrl: string;
  isLocked: boolean;
  setWorkspaceName: (v: string) => void;
  setWorkspaceUrl: (v: string) => void;
  setIsLocked: (v: boolean) => void;
};

export const useOnboardingWS = create<WSState>()(
  persist(
    (set) => ({
      workspaceName: '',
      workspaceUrl: '',
      isLocked: false,
      setWorkspaceName: (v) => set({ workspaceName: v }),
      setWorkspaceUrl: (v) => set({ workspaceUrl: v }),
      setIsLocked: (v) => set({ isLocked: v }),
    }),
    {
      name: 'onboarding-workspace',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        workspaceName: s.workspaceName,
        workspaceUrl: s.workspaceUrl,
        isLocked: s.isLocked,
      }),
    }
  )
);
