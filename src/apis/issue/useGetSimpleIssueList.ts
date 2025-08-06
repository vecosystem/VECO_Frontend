import { axiosInstance } from '../axios';
import type { CommonResponse } from '../../types/common';
import type { SimpleIssueListDto } from '../../types/issue';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';

// 팀의 이슈들을 간단 조회
// 이슈 연결시 사용
const getSimpleIssueList = async (teamId: number): Promise<SimpleIssueListDto> => {
  try {
    const response = await axiosInstance.get<CommonResponse<SimpleIssueListDto>>(
      `/api/teams/${teamId}/issues-simple`
    );
    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error) {
    console.error('팀의 이슈 간단 조회 실패', error);
    throw error;
  }
};

export const useGetSimpleIssueList = (teamId: number) => {
  return useQuery({
    queryKey: [queryKey.ISSUE_LIST_SIMPLE, teamId],
    queryFn: () => getSimpleIssueList(teamId),
  });
};
