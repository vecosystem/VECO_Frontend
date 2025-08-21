import { axiosInstance } from '../axios.ts';
import type { CommonResponse } from '../../types/common.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';

interface GetGithubRepositoryResponse {
  id: number;
  name: string;
  fullName: string | null;
  owner: {
    login: string;
    type: string;
    avatar_url: string;
  };
  description: string | null;
  private: boolean;
  html_url: string;
  default_branch: string;
}

// 깃허브 레포지토리 조회
export const getGithubRepository = async (teamId: number): Promise<GetGithubRepositoryResponse> => {
  try {
    const response = await axiosInstance.get<CommonResponse<GetGithubRepositoryResponse>>(
      `/api/teams/${teamId}/github/repositories`
    );
    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching GitHub repository:', error);
    throw error;
  }
};

export const useGetGithubRepository = (teamId: number, opts?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [queryKey.GITHUB_REPOSITORIES, teamId],
    queryFn: () => getGithubRepository(teamId),
    enabled: opts?.enabled ?? true,
  });
};
