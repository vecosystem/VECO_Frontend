import type { Workspace } from '../../types/setting';
import { axiosInstance } from '../axios';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';

const getWorkspaceProfile = async (): Promise<Workspace> => {
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
