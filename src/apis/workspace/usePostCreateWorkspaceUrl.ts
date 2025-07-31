import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../axios.ts';
import type {
  CreateWorkspaceUrlRequest,
  CreateWorkspaceUrlResponse,
} from '../../types/workspace.ts';

/**
 * 워크스페이스 URL 생성 요청 함수
 */
export const postCreateWorkspaceUrl = async (
  data: CreateWorkspaceUrlRequest
): Promise<CreateWorkspaceUrlResponse> => {
  try {
    const response = await axiosInstance.post<CreateWorkspaceUrlResponse>(
      '/workspace/create-url',
      data
    );
    return response.data;
  } catch (error) {
    console.error('워크스페이스 URL 생성 요청 실패:', error);
    throw error;
  }
};

export const usePostCreateWorkspaceUrl = () => {
  return useMutation<CreateWorkspaceUrlResponse, Error, CreateWorkspaceUrlRequest>({
    mutationFn: postCreateWorkspaceUrl,
  });
};
