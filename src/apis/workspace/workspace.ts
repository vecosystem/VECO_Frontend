import { axiosInstance } from '../axios.ts';
import type {
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  CreateWorkspaceUrlRequest,
  CreateWorkspaceUrlResponse,
} from '../../types/workspace.ts';

/**
 * 워크스페이스 생성 요청 함수
 */
export const postCreateWorkspace = async (
  data: CreateWorkspaceRequest
): Promise<CreateWorkspaceResponse> => {
  const response = await axiosInstance.post<CreateWorkspaceResponse>('/api/workspace', data);
  return response.data;
};

/**
 * 워크스페이스 URL 생성 요청 함수
 */
export const postCreateWorkspaceUrl = async (
  data: CreateWorkspaceUrlRequest
): Promise<CreateWorkspaceUrlResponse> => {
  const response = await axiosInstance.post<CreateWorkspaceUrlResponse>(
    '/api/workspace/create-url',
    data
  );
  return response.data;
};
