import type { InviteMemberResponse } from '../../types/setting.ts';
import { axiosInstance } from '../axios.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';

// 설정 - 팀원 초대
export const getInviteMembers = async (): Promise<InviteMemberResponse> => {
  try {
    const response = await axiosInstance.get<InviteMemberResponse>('/api/workspace/setting/invite');
    return response.data;
  } catch (error) {
    console.error('멤버 초대 목록 조회 실패', error);
    throw error;
  }
};

export const useGetInviteMembers = () => {
  return useSuspenseQuery({
    queryKey: [queryKey.WORKSPACE_MEMBERS],
    queryFn: getInviteMembers,
  });
};
