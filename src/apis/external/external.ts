import type { CommonResponse, PaginationDto } from '../../types/common';
import type { RequestExternalListDto, ResponseExternalDto } from '../../types/external';
import { axiosInstance } from '../axios';

export const getExternalList = async (
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

export const deleteExternalItem = async ({
  teamId,
  externalIds,
}: RequestExternalListDto): Promise<CommonResponse> => {
  try {
    const { data } = await axiosInstance.delete(`/api/teams/${teamId}/externals`, {
      data: externalIds,
    });

    return data;
  } catch (error) {
    console.error('Error deleting external item:', error);
    throw error;
  }
};
