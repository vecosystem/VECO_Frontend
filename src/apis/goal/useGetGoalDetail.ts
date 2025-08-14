import { axiosInstance } from '../axios.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';
import type { ResponseViewGoalDetailDto, ViewGoalDetailDto } from '../../types/goal.ts';
import type { UseQueryOptions } from '@tanstack/react-query';

/**
 * 목표 상세 조회 함수
 * - 목표 상세페이지 조회 모드에서 사용
 * - pages/goal/GoalDetail.tsx
 * - pages/goal/WorkspaceGoalDetail.tsx
 */
const getGoalDetail = async (goalId: number): Promise<ViewGoalDetailDto> => {
  try {
    const response = await axiosInstance.get<ResponseViewGoalDetailDto>(`/api/goals/${goalId}`);

    if (!response.data.result) return Promise.reject(response);
    if (response.data?.isSuccess) {
      console.log('조회 성공:', response.data.result);
    }
    return response.data.result;
  } catch (error) {
    console.error('목표 상세 조회 실패', error);
    throw error;
  }
};

export const useGetGoalDetail = (
  goalId: number,
  options?: UseQueryOptions<ViewGoalDetailDto, Error>
) => {
  return useQuery<ViewGoalDetailDto, Error>({
    queryKey: ['GOAL_DETAIL', goalId],
    queryFn: () => getGoalDetail(goalId),
    enabled: Number.isFinite(goalId),
    ...options,
  });
};
