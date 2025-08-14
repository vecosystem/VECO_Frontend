import { useMutation } from '@tanstack/react-query';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';
import type {
  ExternalFilter,
  RequestExternalListDto,
  ResponseExternalDto,
} from '../../types/external';
import type { CommonResponse } from '../../types/common';
import { axiosInstance } from '../axios';

// external/externalHome.tsx
export const deleteExternalItem = async ({
  teamId,
  externalIds,
}: RequestExternalListDto): Promise<CommonResponse> => {
  try {
    const { data } = await axiosInstance.delete(`/api/teams/${teamId}/externals`, {
      data: { externalIds },
    });

    return data;
  } catch (error) {
    console.error('Error deleting external item:', error);
    throw error;
  }
};

export const useDeleteExternals = () => {
  return useMutation({
    mutationFn: deleteExternalItem,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [queryKey.EXTERNAL_LIST, variables.teamId],
      });

      const prevGoals = queryClient.getQueryData<ResponseExternalDto>([
        queryKey.GOAL_LIST,
        variables.teamId,
      ]);

      if (prevGoals?.result?.data) {
        const optimisticGoals = {
          ...prevGoals,
          result: {
            ...prevGoals.result,
            data: prevGoals.result.data.map((filter: ExternalFilter) => ({
              ...filter,
              goals: filter.externals.filter(
                (external) => !(variables.externalIds ?? []).includes(external.id)
              ),
              dataCnt: filter.externals.filter(
                (external) => !(variables.externalIds ?? []).includes(external.id)
              ).length,
            })),
          },
        };

        queryClient.setQueryData([queryKey.GOAL_LIST, variables.teamId], optimisticGoals);
      }

      return { prevGoals };
    },

    // 에러 발생 시 롤백
    onError: (err, variables, context?: { prevGoals?: ResponseExternalDto }) => {
      if (context?.prevGoals) {
        queryClient.setQueryData([queryKey.EXTERNAL_LIST, variables.teamId], context.prevGoals);
      }
      console.error('Error deleting external item:', err);
    },

    // 성공 시 서버 데이터로 동기화
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.GOAL_LIST, variables.teamId],
      });
    },
  });
};
