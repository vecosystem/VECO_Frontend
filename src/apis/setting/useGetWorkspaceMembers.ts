import type { MemberListResponse } from '../../types/setting.ts';
import { axiosInstance } from '../axios.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';

// 설정 - 워크스페이스 멤버 조회
const getWorkspaceMembers = async (): Promise<MemberListResponse[]> => {
  try {
    const response = await axiosInstance.get<CommonResponse<MemberListResponse[]>>(
      '/api/workspace/setting/members'
    );
    if (!response.data.result) return [];
    return response.data.result;
  } catch (error) {
    console.error('워크스페이스 멤버 조회 실패', error);
    throw error;
  }
};

export const useGetWorkspaceMembers = () => {
  return useQuery({
    queryKey: [queryKey.WORKSPACE_MEMBERS],
    queryFn: getWorkspaceMembers,
  });
};
