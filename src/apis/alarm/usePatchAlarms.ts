import { useMutation } from '@tanstack/react-query';
import { patchAlarmItem } from './alarm';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';

export const usePatchAlarms = () => {
  return useMutation({
    mutationFn: patchAlarmItem,
    onSuccess(data, variables) {
      console.log('Alarm patched successfully:', data);
      queryClient.invalidateQueries({
        queryKey: [queryKey.NOTI_LIST, variables.alarmId],
      });
    },
  });
};
