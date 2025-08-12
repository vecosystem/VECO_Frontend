import type { WorkspaceResponse } from '../../types/setting';
import { axiosInstance } from '../axios';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';
import { LOCAL_STORAGE_KEY } from '../../constants/key.ts';

// 설정 - 워크스페이스 프로필 조회
// - src/pages/onboarding/TokenLoading.tsx
export const getWorkspaceProfile = async (): Promise<WorkspaceResponse> => {
  try {
    const response = await axiosInstance.get('/api/workspace/setting');
    return response.data.result;
  } catch (error) {
    console.error('워크스페이스 프로필 조회 실패', error);
    throw error;
  }
};

export const useGetWorkspaceProfile = () => {
  return useQuery({
    queryKey: [queryKey.WORKSPACE_PROFILE],
    queryFn: getWorkspaceProfile,
    select: (data) => {
      const inviteUrl = localStorage.getItem(LOCAL_STORAGE_KEY.inviteUrl);
      const invitePassword = localStorage.getItem(LOCAL_STORAGE_KEY.invitePassword);
      if (!inviteUrl) {
        localStorage.setItem(LOCAL_STORAGE_KEY.inviteUrl, data.workspaceUrl);
      }
      if (!invitePassword) {
        localStorage.setItem(LOCAL_STORAGE_KEY.invitePassword, data.invitePassword);
      }
      return data;
    },
  });
};
