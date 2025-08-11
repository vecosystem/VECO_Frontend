import { create } from 'zustand';

export type WSState = {
  workspaceName: string;
  workspaceUrl: string;
  setWorkspaceName: (v: string) => void;
  setWorkspaceUrl: (v: string) => void;
};

export const useOnboardingWS = create<WSState>((set) => ({
  workspaceName: '',
  workspaceUrl: '',
  setWorkspaceName: (v) => set({ workspaceName: v }),
  setWorkspaceUrl: (v) => set({ workspaceUrl: v }),
}));
