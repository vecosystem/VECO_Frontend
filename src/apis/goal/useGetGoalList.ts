import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';
import { getGoalList } from './goal';
import type { PaginationDto } from '../../types/common';

export const useGetGoalList = (teamId: string, params: PaginationDto) => {
  return useQuery({
    queryKey: [queryKey.GOAL_LIST, teamId, params],
    queryFn: () => getGoalList({ teamId }, params),
  });
};
