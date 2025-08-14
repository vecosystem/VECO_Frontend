import { useMutation } from '@tanstack/react-query';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';
import type { GoalFilter, RequestGoalListDto, ResponseGoalDto } from '../../types/goal';
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

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [queryKey.GOAL_LIST, variables.teamId],
      });

      const prevGoals = queryClient.getQueryData<ResponseGoalDto>([
        queryKey.GOAL_LIST,
        variables.teamId,
      ]);

      if (prevGoals?.result?.data) {
        const optimisticGoals = {
          ...prevGoals,
          result: {
            ...prevGoals.result,
            data: prevGoals.result.data.map((filter: GoalFilter) => ({
              ...filter,
              goals: filter.goals.filter((goal) => !(variables.goalIds ?? []).includes(goal.id)),
              dataCnt: filter.goals.filter((goal) => !(variables.goalIds ?? []).includes(goal.id))
                .length,
            })),
          },
        };

        queryClient.setQueryData([queryKey.GOAL_LIST, variables.teamId], optimisticGoals);
      }

      return { prevGoals };
    },

    // 에러 발생 시 롤백
    onError: (err, variables, context?: { prevGoals?: ResponseGoalDto }) => {
      if (context?.prevGoals) {
        queryClient.setQueryData([queryKey.GOAL_LIST, variables.teamId], context.prevGoals);
      }
      console.error('Error deleting goal item:', err);
    },

    // 성공 시 서버 데이터로 동기화
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.GOAL_LIST, variables.teamId],
      });
    },
  });
};
