import { useMutation } from '@tanstack/react-query';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';
import type { RequestIssueListDto } from '../../types/issue';
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
    onSuccess(data, variables) {
      console.log('Issues deleted successfully:', data);
      queryClient.invalidateQueries({
        queryKey: [queryKey.ISSUE_LIST, variables.teamId],
      });
    },
  });
};
