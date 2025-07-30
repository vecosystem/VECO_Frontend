import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';
import { getExternalList } from './external';
import type { PaginationDto } from '../../types/common';

export const useGetExternalList = (teamId: string, params: PaginationDto) => {
  return useQuery({
    queryKey: [queryKey.EXTERNAL_LIST, teamId, params],
    queryFn: () => getExternalList({ teamId }, params),
  });
};
