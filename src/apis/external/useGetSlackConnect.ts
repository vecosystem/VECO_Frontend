import { axiosInstance } from '../axios.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useMutation } from '@tanstack/react-query';

interface GetSlackConnectResponse {
  workspaceId: number;
  linkedAt: string;
}

const getSlackConnect = async (workspaceId: number): Promise<GetSlackConnectResponse> => {
  try {
    const response = await axiosInstance.get<CommonResponse<GetSlackConnectResponse>>(
      '/slack/connect',
      { params: workspaceId }
    );
    return response.data.result;
  } catch (error) {
    console.error('Slack 연동 조회 실패', error);
    throw error;
  }
};

export const useGetSlackConnect = (workspaceId: number) => {
  return useMutation({
    mutationFn: () => getSlackConnect(workspaceId),
    onSuccess: () => {
      console.log('Slack 연동 조회 성공');
    },
  });
};
