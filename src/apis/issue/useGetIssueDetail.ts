import { axiosInstance } from '../axios.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';
import type { ResponseViewIssueDetailDto, ViewIssueDetailDto } from '../../types/issue.ts';

/**
 * 이슈 상세 조회 함수
 * - 이슈 상세페이지 조회 모드에서 사용
 * - pages/issue/IssueDetail.tsx
 * - pages/workspace/WorkspaceIssueDetail.tsx
 */
const getIssueDetail = async (issueId: number): Promise<ViewIssueDetailDto> => {
  try {
    const { data } = await axiosInstance.get<ResponseViewIssueDetailDto>(`/api/issues/${issueId}`);
    if (!data.result) return Promise.reject(data);
    if (data?.isSuccess) {
      console.log('조회 성공:', data.result);
    }
    return data.result;
  } catch (error) {
    console.error('이슈 상세 조회 실패', error);
    throw error;
  }
};

export const useGetIssueDetail = (issueId: number, opts?: { enabled?: boolean }) => {
  const enabled = (opts?.enabled ?? true) && Number.isFinite(issueId) && issueId > 0;

  return useQuery<ViewIssueDetailDto>({
    queryKey: [queryKey.ISSUE_DETAIL, issueId],
    queryFn: () => getIssueDetail(issueId),
    enabled, // ← create 경로 등에서 NaN/0이면 쿼리 미실행
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false; // 404면 재시도 안함
      return failureCount < 2;
    },
  });
};
