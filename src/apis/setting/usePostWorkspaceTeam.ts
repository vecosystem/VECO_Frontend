import type { TeamCreateResponse } from '../../types/setting.ts';
import { axiosInstance } from '../axios.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useMutation } from '@tanstack/react-query';
import queryClient from '../../utils/queryClient.ts';
import { queryKey } from '../../constants/queryKey.ts';

interface PostWorkspaceTeamResponse {
  teams: TeamCreateResponse;
}

// 설정 - 팀 생성
const postWorkspaceTeam = async (
  name: string,
  memberId: number[]
): Promise<PostWorkspaceTeamResponse> => {
  try {
    const response = await axiosInstance.post<CommonResponse<PostWorkspaceTeamResponse>>(
      '/api/workspace/setting/teams',
      { name: name, memberId: memberId }
    );
    if (!response.data.result) throw new Error('팀 생성 실패');
    return response.data.result;
  } catch (error) {
    console.error('워크스페이스 팀 생성 실패', error);
    throw error;
  }
};

export const usePostWorkspaceTeam = (name: string, memberId: number[]) => {
  return useMutation({
    mutationFn: () => postWorkspaceTeam(name, memberId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [queryKey.WORKSPACE_TEAMS],
      });
    },
  });
};
