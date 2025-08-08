import { useMutation } from '@tanstack/react-query';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';
import type { RequestExternalListDto } from '../../types/external';
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
    onSuccess(data, variables) {
      console.log('Externals deleted successfully:', data);
      queryClient.invalidateQueries({
        queryKey: [queryKey.EXTERNAL_LIST, variables.teamId],
      });
    },
  });
};
