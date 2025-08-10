import { axiosInstance } from '../axios.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useMutation } from '@tanstack/react-query';

// Github App 설치 플로우
const getGithubConnect = async (teamId: number): Promise<string> => {
  try {
    const response = await axiosInstance.get<CommonResponse<string>>(`/api/github/connect`, {
      params: { teamId: teamId },
    });
    if (!response.data.result) return Promise.reject(response);
    console.log('github 리다이렉트 주소', response.data.result);
    return response.data.result;
  } catch (error) {
    console.error('Github 연동 실패', error);
    throw error;
  }
};

export const useGetGithubConnect = (teamId: number) => {
  return useMutation({
    mutationFn: () => getGithubConnect(teamId),
    onSuccess: (data) => {
      console.log('Github 연동 조회 성공');
      window.location.href = data;
    },
  });
};
