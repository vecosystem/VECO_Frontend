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
  } catch (error: any) {
    // 아직 생성된 이슈 항목이 없을 때: 404 에러가 뜨면 "이 팀에는 이슈 없음"으로 간주 (실제 UI에선 안내문구 노출)
    if (error?.response?.status === 404) {
      return { cnt: 0, info: [] };
    }
    console.error('팀의 이슈 간단 조회 실패', error);
    throw error;
  }
};

export const useGetSimpleIssueList = (teamId: number) => {
  const enabled = Number.isFinite(teamId) && teamId > 0;
  return useQuery({
    queryKey: [queryKey.ISSUE_LIST_SIMPLE, teamId],
    queryFn: () => getSimpleIssueList(teamId),
    select: (data) => data.info,
    enabled,
    retry: (failureCount, error: any) => {
      // 404(리소스 없는 상태)는 재시도 불필요
      if (error?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};
