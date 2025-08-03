import { axiosInstance } from '../axios.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';

// 생성될 이슈 이름 조회
const getIssueName = async (teamId: number): Promise<string> => {
  try {
    const response = await axiosInstance.get<CommonResponse<string>>(
      `/api/teams/${teamId}/issue-name`
    );
    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error) {
    console.error('생성될 이슈 이름 조회 실패', error);
    throw error;
  }
};

export const useGetIssueName = (teamId: number) => {
  return useQuery({
    queryKey: [queryKey.GOAL, teamId],
    queryFn: () => getIssueName(teamId),
  });
};
