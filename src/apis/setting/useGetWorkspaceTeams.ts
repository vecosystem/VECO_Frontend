import type { TeamListResponse } from '../../types/setting.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';
import { axiosInstance } from '../axios.ts';

interface GetWorkspaceTeamsResponse {
  teamList: TeamListResponse[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

// 설정 - 팀 목록 조회
const getWorkspaceTeams = async (
  page?: number,
  size?: number
): Promise<GetWorkspaceTeamsResponse> => {
  try {
    const hasPagination = page !== undefined && size !== undefined;
    const response = await axiosInstance.get<CommonResponse<GetWorkspaceTeamsResponse>>(
      '/api/workspace/setting/teams',
      hasPagination ? { params: { page: page, size: size } } : {}
    );
    return response.data.result;
  } catch (error) {
    console.error('워크스페이스 팀 조회 실패', error);
    throw error;
  }
};

export const useGetWorkspaceTeams = () => {
  return useInfiniteQuery<GetWorkspaceTeamsResponse, Error>({
    queryKey: [queryKey.WORKSPACE_TEAMS],
    queryFn: ({ pageParam }) => {
      const currentPage = (pageParam as number) ?? 0;
      return getWorkspaceTeams(currentPage, 20);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.isLast ? undefined : allPages.length;
    },
    initialPageParam: undefined,
  });
};
