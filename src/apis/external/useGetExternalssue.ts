import { axiosInstance } from '../axios.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';

interface GetExternalIssueResponse {
  cnt: number;
  info: ExternalIssueInfo[];
}

interface ExternalIssueInfo {
  id: number;
  title: string;
}

const getExternalIssue = async (teamId: number): Promise<GetExternalIssueResponse> => {
  try {
    const response = await axiosInstance.get<CommonResponse<GetExternalIssueResponse>>(
      `/api/teams/${teamId}/externals/externals-simple`
    );
    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching external issue:', error);
    throw error;
  }
};

export const useGetExternalIssue = (teamId: number) => {
  return useQuery({
    queryFn: () => getExternalIssue(teamId),
    queryKey: [queryKey.EXTERNAL_ISSUE, teamId],
  });
};
