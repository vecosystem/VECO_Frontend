import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../axios.ts';
import type { JoinWorkspaceRequest, JoinWorkspaceResponse } from '../../types/workspace.ts';

/**
 * 워크스페이스 참여 요청 함수
 */
export const postJoinWorkspace = async (
  data: JoinWorkspaceRequest
): Promise<JoinWorkspaceResponse> => {
  const response = await axiosInstance.post<JoinWorkspaceResponse>(`/api/workspace/join`, data);
  return response.data;
};

export const usePostJoinWorkspace = () => {
  return useMutation<JoinWorkspaceResponse, Error, JoinWorkspaceRequest>({
    mutationFn: postJoinWorkspace,
  });
};
