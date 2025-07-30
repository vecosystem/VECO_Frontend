import type { CommonResponse, PaginationDto } from '../../types/common';
import type { RequestGoalListDto, ResponseGoalDto } from '../../types/goal';
import { axiosInstance } from '../axios';

// goal/GoalHome.tsx
export const getGoalList = async (
  { teamId }: RequestGoalListDto,
  paginationDto: PaginationDto
): Promise<ResponseGoalDto> => {
  try {
    const { data } = await axiosInstance.get(`/api/teams/${teamId}/goals`, {
      params: paginationDto,
    });

    return data;
  } catch (error) {
    console.error('Error fetching goal list:', error);
    throw error;
  }
};

export const deleteGoalItem = async ({
  teamId,
  goalIds,
}: RequestGoalListDto): Promise<CommonResponse> => {
  try {
    const { data } = await axiosInstance.delete(`/api/teams/${teamId}/goals`, {
      data: { goalIds },
    });

    return data;
  } catch (error) {
    console.error('Error deleting goal item:', error);
    throw error;
  }
};
