import { useMutation } from '@tanstack/react-query';
import { deleteAlarmItem } from './alarm';
import { queryKey } from '../../constants/queryKey';
import queryClient from '../../utils/queryClient';

export const useDeleteAlarms = () => {
  return useMutation({
    mutationFn: deleteAlarmItem,
    onSuccess(data, variables) {
      console.log('Alarms deleted successfully:', data);
      queryClient.invalidateQueries({
        queryKey: [queryKey.NOTI_LIST, variables.alarmIds],
      });
    },
  });
};
