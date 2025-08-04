import { axiosInstance } from '../axios.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useMutation } from '@tanstack/react-query';

interface GetSlackConnectResponse {
  workspaceId: number;
  linkedAt: string;
}

const getSlackConnect = async (): Promise<GetSlackConnectResponse> => {
  try {
    const response =
      await axiosInstance.get<CommonResponse<GetSlackConnectResponse>>('/slack/connect');
    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error) {
    console.error('Slack 연동 조회 실패', error);
    throw error;
  }
};

export const useGetSlackConnect = () => {
  return useMutation({
    mutationFn: () => getSlackConnect(),
    onSuccess: () => {
      console.log('Slack 연동 조회 성공');
    },
  });
};
