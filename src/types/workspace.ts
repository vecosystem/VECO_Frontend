import type { CommonResponse } from './common';

// 워크스페이스 생성
export interface CreateWorkspaceRequest {
  workspaceName: string;
}

export type CreateWorkspaceResponse = CommonResponse<{
  workspaceId: number;
  workspaceName: string;
  workspaceUrl: string;
  inviteUrl: string;
  invitePassWord: string;
  defaultTeamId: number;
}>;

// 워크스페이스 URL 생성
export interface CreateWorkspaceUrlRequest {
  workspaceName: string;
}

export type CreateWorkspaceUrlResponse = CommonResponse<{
  workspaceUrl: string;
}>;

// 워크스페이스 참여
export interface JoinWorkspaceRequest {
  token: string;
  password: string;
}

export type JoinWorkspaceResponse = CommonResponse<{
  workspaceId: number;
  joinedAt: string;
} | null>;
