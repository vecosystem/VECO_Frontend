import { useMutation } from '@tanstack/react-query';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';
import type { IssueFilter, RequestIssueListDto, ResponseIssueDto } from '../../types/issue';
import type { CommonResponse } from '../../types/common';
import { axiosInstance } from '../axios';

//issue/IssueHome.tsx
const deleteIssueItem = async ({
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

export const useDeleteIssues = () => {
  return useMutation({
    mutationFn: deleteIssueItem,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [queryKey.ISSUE_LIST, variables.teamId],
      });

      const prevGoals = queryClient.getQueryData<ResponseIssueDto>([
        queryKey.GOAL_LIST,
        variables.teamId,
      ]);

      if (prevGoals?.result?.data) {
        const optimisticGoals = {
          ...prevGoals,
          result: {
            ...prevGoals.result,
            data: prevGoals.result.data.map((filter: IssueFilter) => ({
              ...filter,
              goals: filter.issues.filter(
                (issue) => !(variables.issueIds ?? []).includes(issue.id)
              ),
              dataCnt: filter.issues.filter(
                (issue) => !(variables.issueIds ?? []).includes(issue.id)
              ).length,
            })),
          },
        };

        queryClient.setQueryData([queryKey.GOAL_LIST, variables.teamId], optimisticGoals);
      }

      return { prevGoals };
    },

    // 에러 발생 시 롤백
    onError: (err, variables, context?: { prevGoals?: ResponseIssueDto }) => {
      if (context?.prevGoals) {
        queryClient.setQueryData([queryKey.ISSUE_LIST, variables.teamId], context.prevGoals);
      }
      console.error('Error deleting issue item:', err);
    },

    // 성공 시 서버 데이터로 동기화
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.GOAL_LIST, variables.teamId],
      });
    },
  });
};
