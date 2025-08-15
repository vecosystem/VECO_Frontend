import { axiosInstance } from '../axios.ts';
import { useMutation } from '@tanstack/react-query';
import { mutationKey } from '../../constants/mutationKey.ts';
import { queryKey } from '../../constants/queryKey.ts';
import queryClient from '../../utils/queryClient.ts';
import type {
  CreateIssueDetailDto,
  CreateIssueResultDto,
  ResponseCreateIssueDetailDto,
} from '../../types/issue.ts';

/**
 * 이슈 작성 함수
 * - 이슈 상세페이지 생성 모드에서 사용
 * - pages/issue/IssueDetail.tsx
 * - pages/goal/WorkspaceIssueDetail.tsx
 */
const createIssue = async (
  teamId: number,
  payload: CreateIssueDetailDto
): Promise<CreateIssueResultDto> => {
  try {
    const response = await axiosInstance.post<ResponseCreateIssueDetailDto>(
      `/api/teams/${teamId}/issues`,
      payload
    );

    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error: any) {
    console.error('이슈 작성 실패:', error);
    console.log('👉 RESPONSE STATUS:', error?.response?.status);
    console.log('👉 RESPONSE DATA:', error?.response?.data);
    throw error;
  }
};

export const useCreateIssue = (teamId: number) => {
  return useMutation<CreateIssueResultDto, Error, CreateIssueDetailDto>({
    mutationKey: [mutationKey.ISSUE_CREATE, teamId],
    mutationFn: (payload) => createIssue(teamId, payload),
    onSuccess: () => {
      // 이슈 작성하여 POST 후 조회되는 데이터 최신화
      queryClient.invalidateQueries({ queryKey: [queryKey.ISSUE_LIST, teamId] });
      queryClient.invalidateQueries({ queryKey: [queryKey.ISSUE_NAME, teamId] });
    },
  });
};
