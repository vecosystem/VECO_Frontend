import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';
import type { PaginationDto } from '../../types/common';
import type { RequestGoalListDto, ResponseGoalDto } from '../../types/goal';
import { axiosInstance } from '../axios';

// goal/GoalHome.tsx
const getGoalList = async (
  { teamId }: RequestGoalListDto,
  paginationDto: PaginationDto
): Promise<ResponseGoalDto> => {
  try {
    const { data } = await axiosInstance.get(`/api/teams/${teamId}/goals`, {
      params: paginationDto,
    });

    return data;
  } catch (error) {
    console.error('Error fetching goal list:', error);
    throw error;
  }
};

export const useGetGoalList = (teamId: string, params: PaginationDto) => {
  return useQuery({
    queryKey: [queryKey.GOAL_LIST, teamId, params],
    queryFn: () => getGoalList({ teamId }, params),
  });
};

export const useGetInfiniteGoalList = (teamId: string, params: PaginationDto) => {
  return useInfiniteQuery({
    queryKey: [queryKey.GOAL_LIST, teamId, params.query],
    queryFn: ({ pageParam = '-1' }) =>
      getGoalList({ teamId }, { ...params, cursor: pageParam, size: 3 }), // 한 번에 불러올 데이터 개수
    initialPageParam: '-1',
    getNextPageParam: (lastPage: ResponseGoalDto) => {
      if (lastPage.result?.hasNext) {
        return lastPage.result.nextCursor;
      }
      return undefined;
    },
    enabled: !!teamId,
  });
};
