import { axiosInstance } from '../axios';
import type { CommonResponse } from '../../types/common';
import type { SimpleGoalListDto } from '../../types/goal';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';

// 팀의 목표들을 간단 조회
// 이슈, 외부에서 목표 연결시 사용
const getSimpleGoalList = async (teamId: number): Promise<SimpleGoalListDto> => {
  try {
    const response = await axiosInstance.get<CommonResponse<SimpleGoalListDto>>(
      `/api/teams/${teamId}/goals-simple`
    );
    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error) {
    console.error('팀의 목표 간단 조회 실패', error);
    throw error;
  }
};

export const useGetSimpleGoalList = (teamId: number) => {
  return useQuery({
    queryKey: [queryKey.GOAL_LIST_SIMPLE, teamId],
    queryFn: () => getSimpleGoalList(teamId),
  });
};
