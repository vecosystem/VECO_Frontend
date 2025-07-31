import { useMutation } from '@tanstack/react-query';
import { deleteExternalItem } from './external';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';

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
