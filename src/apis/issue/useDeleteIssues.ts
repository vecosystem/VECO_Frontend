import { useMutation } from '@tanstack/react-query';
import { deleteIssueItem } from './issue';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';

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
