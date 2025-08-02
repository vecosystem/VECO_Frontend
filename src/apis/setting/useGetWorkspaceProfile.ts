import type { WorkspaceResponse } from '../../types/setting';
import { axiosInstance } from '../axios';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';

// 설정 - 워크스페이스 프로필 조회
const getWorkspaceProfile = async (): Promise<WorkspaceResponse> => {
  try {
    const response = await axiosInstance.get('/api/workspace/setting/profile');
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
  });
};
