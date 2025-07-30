import { useMutation } from '@tanstack/react-query';
import { deleteGoalItem } from './goal';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';

export const useDeleteGoals = () => {
  return useMutation({
    mutationFn: deleteGoalItem,
    onSuccess(data, variables) {
      console.log('Goals deleted successfully:', data);
      queryClient.invalidateQueries({
        queryKey: [queryKey.GOAL_LIST, variables.teamId],
      });
    },
  });
};
