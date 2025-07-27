import type { TeamListResponse } from '../types/setting.ts';
import axios from 'axios';
import type { CommonResponse } from '../types/common.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../constants/queryKey.ts';
import { END_POINT } from '../constants/api.ts';

const fetchTeamList = async (): Promise<TeamListResponse> => {
  try {
    const response = await axios.get<CommonResponse<TeamListResponse>>(END_POINT.FETCH_TEAM_LIST);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching team list:', error);
    throw error;
  }
};

export const useFetchTeamList = () => {
  return useQuery({
    queryKey: [queryKey.TEAMS],
    queryFn: fetchTeamList,
  });
};
