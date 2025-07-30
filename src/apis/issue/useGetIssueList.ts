import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';
import { getIssueList } from './issue';
import type { PaginationDto } from '../../types/common';

export const useGetIssueList = (teamId: string, params: PaginationDto) => {
  return useQuery({
    queryKey: [queryKey.ISSUE_LIST, teamId, params],
    queryFn: () => getIssueList({ teamId }, params),
  });
};
