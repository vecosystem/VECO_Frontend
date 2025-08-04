import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';
import type { PaginationDto } from '../../types/common';
import type { RequestExternalListDto, ResponseExternalDto } from '../../types/external';
import { axiosInstance } from '../axios';

// external/externalHome.tsx
const getExternalList = async (
  { teamId }: RequestExternalListDto,
  paginationDto: PaginationDto
): Promise<ResponseExternalDto> => {
  try {
    const { data } = await axiosInstance.get(`/api/teams/${teamId}/externals`, {
      params: paginationDto,
    });

    console.log('외부 연동 리스트 데이터 불러오기 성공', data);
    return data;
  } catch (error) {
    console.error('Error fetching external list:', error);
    throw error;
  }
};

export const useGetExternalList = (teamId: string, params: PaginationDto) => {
  return useQuery({
    queryKey: [queryKey.EXTERNAL_LIST, teamId, params],
    queryFn: () => getExternalList({ teamId }, params),
  });
};

export const useGetInfiniteExternalList = (teamId: string, params: PaginationDto) => {
  return useInfiniteQuery({
    queryKey: [queryKey.EXTERNAL_LIST, teamId, params.query],
    queryFn: ({ pageParam = '0' }) =>
      getExternalList({ teamId }, { ...params, cursor: pageParam, size: 3 }), // 한 번에 불러올 데이터 개수
    initialPageParam: '-1',
    getNextPageParam: (lastPage: ResponseExternalDto) => {
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
