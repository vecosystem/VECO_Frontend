import type { CommonResponse } from './common';

// 워크스페이스 생성
export type CreateWorkspaceRequest = {
  workspaceName: string;
};

export type CreateWorkspaceResponse = CommonResponse<{
  workspaceId: number;
  name: string;
  workspaceName: string;
  workspaceUrl: string;
  inviteUrl: string;
  invitePassword: string;
  defaultTeamId: number;
}>;

// 워크스페이스 URL 생성
export type CreateWorkspaceUrlRequest = {
  workspaceName: string;
};

export type CreateWorkspaceUrlResponse = CommonResponse<{
  workspaceUrl: string;
}>;

// 워크스페이스 참여
export type JoinWorkspaceRequest = {
  token: string;
  password: string;
};

export type JoinWorkspaceResponse = CommonResponse<{
  workspaceId: number;
  joinedAt: string;
} | null>;
