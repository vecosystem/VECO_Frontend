import { axiosInstance } from '../axios.ts';
import { useMutation } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';
import type { CommonResponse } from '../../types/common.ts';
import type { CreateGoalDetailDto } from '../../types/goal.ts';

/**
 * 목표 작성 함수
 * - pages/goal/GoalDetail.tsx
 */

const createGoal = async (teamId: number, payload: CreateGoalDetailDto): Promise<boolean> => {
  try {
    const response = await axiosInstance.post<CommonResponse<boolean>>(
      `/api/teams/${teamId}/goals`,
      payload
    );

    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error) {
    console.error('목표 작성 실패:', error);
    throw error;
  }
};

export const useCreateGoal = (teamId: number) => {
  return useMutation({
    mutationFn: (payload: CreateGoalDetailDto) => createGoal(teamId, payload),
    mutationKey: [queryKey.GOAL_CREATE, teamId],
  });
};
