import type { CommonResponse, PaginationDto } from '../types/common';
import type { RequestIssueListDto, ResponseIssueDto } from '../types/issue';
import { axiosInstance } from './axios';

//issue/IssueHome.tsx
export const getIssueList = async (
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

export const deleteIssueItem = async ({
  teamId,
  issueIds,
}: RequestIssueListDto): Promise<CommonResponse> => {
  try {
    const { data } = await axiosInstance.delete(`/api/teams/${teamId}/issues`, {
      data: { issueIds },
    });

    return data;
  } catch (error) {
    console.error('Error deleting issue item:', error);
    throw error;
  }
};
