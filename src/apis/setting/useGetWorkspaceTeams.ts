import type { TeamListResponse } from '../../types/setting.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';
import { axiosInstance } from '../axios.ts';

// 설정 - 팀 목록 조회
const getWorkspaceTeams = async (): Promise<TeamListResponse[]> => {
  try {
    const response = await axiosInstance.get<CommonResponse<TeamListResponse[]>>(
      '/api/workspace/setting/teams'
    );
    if (!response.data.result) return [];
    return response.data.result;
  } catch (error) {
    console.error('워크스페이스 팀 조회 실패', error);
    throw error;
  }
};

export const useGetWorkspaceTeams = () => {
  return useQuery({
    queryKey: [queryKey.WORKSPACE_TEAMS],
    queryFn: getWorkspaceTeams,
  });
};
