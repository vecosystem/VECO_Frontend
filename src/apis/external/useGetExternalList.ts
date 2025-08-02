import { useQuery } from '@tanstack/react-query';
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
