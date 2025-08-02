import { useQuery } from '@tanstack/react-query';
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
