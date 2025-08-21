import { axiosInstance } from '../axios.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';

interface GetGithubInstallationIdResponse {
  teamId: number;
  installationId: number;
}

// 깃허브 설치 ID 조회
const getGithubInstallationId = async (
  teamId: number
): Promise<GetGithubInstallationIdResponse> => {
  try {
    const response = await axiosInstance.get<CommonResponse<GetGithubInstallationIdResponse>>(
      `/api/teams/${teamId}/github/installation`
    );
    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching GitHub installation ID:', error);
    throw error;
  }
};

export const useGetGithubInstallationId = (teamId: number, opts?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [queryKey.GITHUB_INSTALLATION_ID, teamId],
    queryFn: () => getGithubInstallationId(teamId),
    enabled: opts?.enabled ?? true,
  });
};
