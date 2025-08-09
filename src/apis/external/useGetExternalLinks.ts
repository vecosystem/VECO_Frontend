import { axiosInstance } from '../axios.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';
import type { CommonResponse } from '../../types/common.ts';

interface GetExternalLinksResponse {
  linkedWithGithub: boolean;
  linkedWithSlack: boolean;
}

const getExternalLinks = async (teamId: number): Promise<GetExternalLinksResponse> => {
  try {
    const response = await axiosInstance.get<CommonResponse<GetExternalLinksResponse>>(
      `/api/teams/${teamId}/externals/links`
    );
    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching external links:', error);
    throw error;
  }
};

export const useGetExternalLinks = (teamId: number) => {
  return useQuery({
    queryFn: () => getExternalLinks(teamId),
    queryKey: [queryKey.EXTERNAL_LINKS, teamId],
  });
};
