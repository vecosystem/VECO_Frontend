import { axiosInstance } from '../axios.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';
import type { ResponseViewIssueDetailDto, ViewIssueDetailDto } from '../../types/issue.ts';

/**
 * 이슈 상세 조회 함수
 * - 이슈 상세페이지 조회 모드에서 사용
 * - pages/goal/GoalDetail.tsx
 * - pages/workspace/WorkspaceGoalDetail.tsx
 */
const getIssueDetail = async (issueId: number): Promise<ViewIssueDetailDto> => {
  try {
    const response = await axiosInstance.get<ResponseViewIssueDetailDto>(`/api/issues/${issueId}`);

    if (!response.data.result) return Promise.reject(response);
    if (response.data?.isSuccess) {
      console.log('조회 성공:', response.data.result);
    }
    return response.data.result;
  } catch (error) {
    console.error('이슈 상세 조회 실패', error);
    throw error;
  }
};

export const useGetIssueDetail = (issueId: number) => {
  return useQuery({
    queryKey: [queryKey.ISSUE_DETAIL, issueId],
    queryFn: () => getIssueDetail(issueId),
    enabled: Number.isFinite(issueId),
  });
};
