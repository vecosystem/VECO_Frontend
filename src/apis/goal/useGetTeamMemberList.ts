import { axiosInstance } from '../axios';
import type { CommonResponse } from '../../types/common';
import type { TeamMemberListDto } from '../../types/goal';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';

// 팀의 멤버 조회
// 목표 생성시 담당자 할당에 사용
const getTeamMemberList = async (teamId: number): Promise<TeamMemberListDto> => {
  try {
    const response = await axiosInstance.get<CommonResponse<TeamMemberListDto>>(
      `/api/teams/${teamId}/teammate`
    );
    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error) {
    console.error('팀의 멤버 조회 실패', error);
    throw error;
  }
};

export const useGetTeamMemberList = (teamId: number) => {
  return useQuery({
    queryKey: [queryKey.TEAM_MEMBER_LIST, teamId],
    queryFn: () => getTeamMemberList(teamId),
  });
};
