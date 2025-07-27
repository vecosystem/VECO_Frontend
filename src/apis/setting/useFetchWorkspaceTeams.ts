import type { TeamListResponse } from '../../types/setting.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';
import { END_POINT } from '../../constants/api.ts';
import { axiosInstance } from '../axios.ts';

const fetchWorkspaceTeams = async (): Promise<TeamListResponse[]> => {
  try {
    const response = await axiosInstance.get<CommonResponse<TeamListResponse[]>>(
      END_POINT.FETCH_WORKSPACE_TEAMS
    );
    if (!response.data.result) return [];
    return response.data.result;
  } catch (error) {
    console.error('워크스페이스 팀 조회 실패', error);
    throw error;
  }
};

export const useFetchWorkspaceTeams = () => {
  return useQuery({
    queryKey: [queryKey.WORKSPACE_TEAMS],
    queryFn: fetchWorkspaceTeams,
  });
};
