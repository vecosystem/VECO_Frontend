import { useMutation } from '@tanstack/react-query';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';
import type { RequestAlarmListDto } from '../../types/alarm';
import type { CommonResponse } from '../../types/common';
import { axiosInstance } from '../axios';

// notification/NotiHome.tsx
const patchAlarmItem = async ({ alarmId }: RequestAlarmListDto): Promise<CommonResponse> => {
  try {
    const { data } = await axiosInstance.patch(`/api/alarms/${alarmId}`);
    return data;
  } catch (error) {
    console.error('Error patching alarm item:', error);
    throw error;
  }
};

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
