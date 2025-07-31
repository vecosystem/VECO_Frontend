import { axiosInstance } from '../axios.ts';
import type { CreateWorkspaceRequest, CreateWorkspaceResponse } from '../../types/workspace.ts';

/**
 * 워크스페이스 생성 요청 함수
 */
export const createWorkspace = async (
  data: CreateWorkspaceRequest
): Promise<CreateWorkspaceResponse> => {
  const response = await axiosInstance.post<CreateWorkspaceResponse>('/api/workspace', data);
  return response.data;
};
