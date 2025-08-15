import { axiosInstance } from '../axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  type ResponseCreateGoalDetailDto,
  type CreateGoalDetailDto,
  type CreateGoalResultDto,
} from '../../types/goal.ts';
import { mutationKey } from '../../constants/mutationKey.ts';
import { queryKey } from '../../constants/queryKey.ts';

/**
 * 목표 작성 함수
 * - 목표 상세페이지 생성 모드에서 사용
 * - pages/goal/GoalDetail.tsx
 * - pages/goal/WorkspaceGoalDetail.tsx
 */
const createGoal = async (
  teamId: number,
  payload: CreateGoalDetailDto
): Promise<CreateGoalResultDto> => {
  try {
    const response = await axiosInstance.post<ResponseCreateGoalDetailDto>(
      `/api/teams/${teamId}/goals`,
      payload
    );

    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error: any) {
    console.error('목표 작성 실패:', error);
    console.log('👉 RESPONSE STATUS:', error?.response?.status);
    console.log('👉 RESPONSE DATA:', error?.response?.data);
    throw error;
  }
};

export const useCreateGoal = (teamId: number) => {
  const qc = useQueryClient();

  return useMutation<CreateGoalResultDto, Error, CreateGoalDetailDto>({
    mutationKey: [mutationKey.GOAL_CREATE, teamId],
    mutationFn: (payload) => createGoal(teamId, payload),
    onSuccess: () => {
      // 목표 작성하여 POST 후 조회되는 데이터 최신화
      qc.invalidateQueries({ queryKey: [queryKey.GOAL_LIST, teamId] });
      qc.invalidateQueries({ queryKey: [queryKey.GOAL_NAME, teamId] });
    },
  });
};
