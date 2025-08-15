import { axiosInstance } from '../axios.ts';
import { useMutation } from '@tanstack/react-query';
import { mutationKey } from '../../constants/mutationKey.ts';
import { queryKey } from '../../constants/queryKey.ts';
import queryClient from '../../utils/queryClient.ts';
import type {
  ResponseUpdateIssueDetailDto,
  UpdateIssueDetailDto,
  UpdateIssueResultDto,
} from '../../types/issue.ts';

/**
 * 이슈 수정 (PATCH) 함수
 * - 동일 teamId / 동일 issueId 대상의 상세 내용 반영
 * - pages/issue/IssueDetail.tsx
 * - pages/workspace/WorkspaceIssueDetail.tsx
 */
const updateIssue = async (
  teamId: number,
  issueId: number,
  payload: UpdateIssueDetailDto
): Promise<UpdateIssueResultDto> => {
  try {
    const response = await axiosInstance.patch<ResponseUpdateIssueDetailDto>(
      `/api/teams/${teamId}/issues/${issueId}`,
      payload
    );

    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error: any) {
    console.error('이슈 수정 실패:', error);
    console.log('👉 RESPONSE STATUS:', error?.response?.status);
    console.log('👉 RESPONSE DATA:', error?.response?.data);
    throw error;
  }
};

export const useUpdateIssue = (teamId: number, issueId: number) => {
  return useMutation<UpdateIssueResultDto, Error, UpdateIssueDetailDto>({
    mutationKey: [mutationKey.ISSUE_UPDATE, teamId, issueId],
    mutationFn: (payload) => updateIssue(teamId, issueId, payload),
    onSuccess: () => {
      // 상세/목록/관련 파생 쿼리 최신화
      queryClient.invalidateQueries({ queryKey: [queryKey.ISSUE_LIST, teamId] });
      queryClient.invalidateQueries({ queryKey: [queryKey.ISSUE_NAME, teamId] });
    },
  });
};
