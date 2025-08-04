import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';
import type { PaginationDto } from '../../types/common';
import type { RequestIssueListDto, ResponseIssueDto } from '../../types/issue';
import { axiosInstance } from '../axios';

//issue/IssueHome.tsx
const getIssueList = async (
  { teamId }: RequestIssueListDto,
  paginationDto: PaginationDto
): Promise<ResponseIssueDto> => {
  try {
    const { data } = await axiosInstance.get(`/api/teams/${teamId}/issues`, {
      params: paginationDto,
    });

    return data;
  } catch (error) {
    console.error('Error fetching issue list:', error);
    throw error;
  }
};

export const useGetIssueList = (teamId: string, params: PaginationDto) => {
  return useQuery({
    queryKey: [queryKey.ISSUE_LIST, teamId, params],
    queryFn: () => getIssueList({ teamId }, params),
  });
};

export const useGetInfiniteIssueList = (teamId: string, params: PaginationDto) => {
  return useInfiniteQuery({
    queryKey: [queryKey.ISSUE_LIST, teamId, params.query],
    queryFn: ({ pageParam = '-1' }) =>
      getIssueList({ teamId }, { ...params, cursor: pageParam, size: 3 }), // 한 번에 불러올 데이터 개수
    initialPageParam: '-1',
    getNextPageParam: (lastPage: ResponseIssueDto) => {
      if (lastPage.result?.hasNext) {
        return lastPage.result.nextCursor;
      }
      return undefined;
    },
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.result?.data ?? []),
      pageParams: data.pageParams,
    }),
    enabled: !!teamId,
  });
};
