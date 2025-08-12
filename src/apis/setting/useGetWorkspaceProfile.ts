import type { WorkspaceResponse } from '../../types/setting';
import { axiosInstance } from '../axios';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';
import { LOCAL_STORAGE_KEY } from '../../constants/key.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';

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
      const { setItem: setInviteUrl, getItem: getInviteUrl } = useLocalStorage(
        LOCAL_STORAGE_KEY.inviteUrl
      );
      const { setItem: setInvitePassword, getItem: getInvitePassword } = useLocalStorage(
        LOCAL_STORAGE_KEY.invitePassword
      );

      if (!getInviteUrl()) setInviteUrl(data.workspaceUrl);
      if (!getInvitePassword()) setInvitePassword(data.invitePassword);
      return data;
    },
  });
};
