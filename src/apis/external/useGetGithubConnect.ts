import { axiosInstance } from '../axios.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useMutation } from '@tanstack/react-query';

interface GetGithubConnectResponse {
  teamId: number;
  installationId: number;
}

// Github App 설치 플로우
const getGithubConnect = async (teamId: number): Promise<GetGithubConnectResponse> => {
  try {
    const response = await axiosInstance.get<CommonResponse<GetGithubConnectResponse>>(
      `/github/connect`,
      { params: teamId }
    );
    return response.data.result;
  } catch (error) {
    console.error('Github 연동 실패', error);
    throw error;
  }
};

export const useGetGithubConnect = (teamId: number) => {
  return useMutation({
    mutationFn: () => getGithubConnect(teamId),
    onSuccess: () => {
      console.log('Github 연동 조회 성공');
    },
  });
};
