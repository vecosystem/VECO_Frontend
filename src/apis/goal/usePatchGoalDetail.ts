// src/apis/goal/updateGoal.ts
import { axiosInstance } from '../axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  UpdateGoalDetailDto,
  UpdateGoalResultDto,
  ResponseUpdateGoalDetailDto,
} from '../../types/goal.ts';
import { mutationKey } from '../../constants/mutationKey.ts';
import { queryKey } from '../../constants/queryKey.ts';

/**
 * 목표 수정 (PATCH) 함수
 * - 동일 teamId / 동일 goalId 대상의 상세 내용 반영
 * - pages/goal/GoalDetail.tsx
 * - pages/goal/WorkspaceGoalDetail.tsx
 */
const updateGoal = async (
  teamId: number,
  goalId: number,
  payload: UpdateGoalDetailDto
): Promise<UpdateGoalResultDto> => {
  try {
    const response = await axiosInstance.patch<ResponseUpdateGoalDetailDto>(
      `/api/teams/${teamId}/goals/${goalId}`,
      payload
    );

    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error: any) {
    console.error('목표 수정 실패:', error);
    console.log('👉 RESPONSE STATUS:', error?.response?.status);
    console.log('👉 RESPONSE DATA:', error?.response?.data);
    throw error;
  }
};

export const useUpdateGoal = (teamId: number, goalId: number) => {
  const qc = useQueryClient();

  return useMutation<UpdateGoalResultDto, Error, UpdateGoalDetailDto>({
    mutationKey: [mutationKey.GOAL_UPDATE, teamId, goalId],
    mutationFn: (payload) => updateGoal(teamId, goalId, payload),
    onSuccess: () => {
      // 상세/목록/관련 파생 쿼리 최신화
      qc.invalidateQueries({ queryKey: [queryKey.GOAL_LIST, teamId] });
      qc.invalidateQueries({ queryKey: [queryKey.GOAL_NAME, teamId] });
    },
  });
};
