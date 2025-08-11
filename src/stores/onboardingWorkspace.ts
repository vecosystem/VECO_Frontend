import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type WSState = {
  workspaceName: string;
  workspaceUrl: string;
  setWorkspaceName: (v: string) => void;
  setWorkspaceUrl: (v: string) => void;
};

export const useOnboardingWS = create<WSState>()(
  persist(
    (set) => ({
      workspaceName: '',
      workspaceUrl: '',
      setWorkspaceName: (v) => set({ workspaceName: v }),
      setWorkspaceUrl: (v) => set({ workspaceUrl: v }),
    }),
    {
      name: 'onboarding-workspace',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ workspaceName: s.workspaceName, workspaceUrl: s.workspaceUrl }),
    }
  )
);
