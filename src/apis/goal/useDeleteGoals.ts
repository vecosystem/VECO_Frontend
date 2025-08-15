import { useMutation } from '@tanstack/react-query';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';
import type { RequestGoalListDto } from '../../types/goal';
import type { CommonResponse } from '../../types/common';
import { axiosInstance } from '../axios';

// goal/GoalHome.tsx
const deleteGoalItem = async ({ teamId, goalIds }: RequestGoalListDto): Promise<CommonResponse> => {
  try {
    const { data } = await axiosInstance.delete(`/api/teams/${teamId}/goals`, {
      data: { goalIds },
    });

    return data;
  } catch (error) {
    console.error('Error deleting goal item:', error);
    throw error;
  }
};

export const useDeleteGoals = () => {
  return useMutation({
    mutationFn: deleteGoalItem,
    onSuccess(data, variables) {
      console.log('Goals deleted successfully:', data);
      queryClient.invalidateQueries({
        queryKey: [queryKey.GOAL_LIST, variables.teamId],
      });
    },
    onError(error) {
      console.error('Error deleting goal item:', error);
    },
  });
};
