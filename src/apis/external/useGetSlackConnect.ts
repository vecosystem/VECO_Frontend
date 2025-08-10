import { axiosInstance } from '../axios.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useMutation } from '@tanstack/react-query';

// Slack App 설치 플로우
const getSlackConnect = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get<CommonResponse<string>>('/slack/connect');
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
    onSuccess: (data) => {
      console.log('Slack 연동 조회 성공');
      window.location.href = `${data}`;
    },
  });
};
