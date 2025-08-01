import { axiosInstance } from '../axios';
import { useMutation } from '@tanstack/react-query';
import type { CommonResponse } from '../../types/common';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';

// 사이드바, 설정 - 팀 순서 변경
const patchWorkspaceTeams = async (body: { teamIdList: number[] }): Promise<CommonResponse<{}>> => {
  try {
    const response = await axiosInstance.patch('/api/workspace/setting/teams', body);
    return response.data;
  } catch (error) {
    console.error('워크스페이스 팀 순서 변경 실패', error);
    throw error;
  }
};

export const usePatchWorkspaceTeams = () => {
  return useMutation({
    mutationFn: patchWorkspaceTeams,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [queryKey.WORKSPACE_TEAMS],
      });
    },
  });
};
