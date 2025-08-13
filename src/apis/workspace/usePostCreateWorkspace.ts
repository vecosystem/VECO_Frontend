import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../axios.ts';
import type { CreateWorkspaceRequest, CreateWorkspaceResponse } from '../../types/workspace.ts';
import { LOCAL_STORAGE_KEY } from '../../constants/key.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';

/**
 * 워크스페이스 생성 요청 함수
 * - pages/onboarding/OnboardingCreateWorkspace.tsx
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
        const { setItem: setInviteUrl } = useLocalStorage(LOCAL_STORAGE_KEY.inviteUrl);
        const { setItem: setInvitePassword } = useLocalStorage(LOCAL_STORAGE_KEY.invitePassword);
        const { setItem: setName } = useLocalStorage(LOCAL_STORAGE_KEY.name);
        // 워크스페이스 생성 성공 시 로컬 스토리지에 정보 저장
        setInviteUrl(data.result.inviteUrl);
        setInvitePassword(data.result.invitePassword);
        setName(data.result.name);
      }
    },
  });
};
