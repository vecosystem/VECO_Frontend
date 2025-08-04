import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../axios.ts';
import type { CreateWorkspaceRequest, CreateWorkspaceResponse } from '../../types/workspace.ts';
import { LOCAL_STORAGE_KEY } from '../../constants/key.ts';

/**
 * 워크스페이스 생성 요청 함수
 */
export const postCreateWorkspace = async (
  data: CreateWorkspaceRequest
): Promise<CreateWorkspaceResponse> => {
  try {
    const response = await axiosInstance.post<CreateWorkspaceResponse>('/api/workspace', data);
    return response.data;
  } catch (error) {
    console.error('워크스페이스 생성 요청 실패:', error);
    throw error;
  }
};

export const usePostCreateWorkspace = () => {
  return useMutation<CreateWorkspaceResponse, Error, CreateWorkspaceRequest>({
    mutationFn: postCreateWorkspace,
    onSuccess: (data) => {
      if (data.result) {
        localStorage.setItem(LOCAL_STORAGE_KEY.inviteUrl, data.result.inviteUrl);
        localStorage.setItem(LOCAL_STORAGE_KEY.invitePassword, data.result.invitePassword);
        localStorage.setItem(LOCAL_STORAGE_KEY.name, data.result.name);
      }
    },
  });
};
