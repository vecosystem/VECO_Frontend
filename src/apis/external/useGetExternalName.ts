import { axiosInstance } from '../axios.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';

// 팀 내 외부 이슈 생성 전 코드 발급
const getExternalName = async (teamId: number): Promise<string> => {
  try {
    const response = await axiosInstance.get<CommonResponse<string>>(
      `/api/teams/${teamId}/external-name`
    );
    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error) {
    console.error('생성될 외부 이름 조회 실패', error);
    throw error;
  }
};

export const useGetExternalName = (teamId: number) => {
  return useQuery({
    queryKey: [queryKey.EXTERNAL, teamId],
    queryFn: () => getExternalName(teamId),
  });
};
