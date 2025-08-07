import { useMutation } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';
import queryClient from '../../utils/queryClient';
import type { CommonResponse } from '../../types/common';
import { axiosInstance } from '../axios';

// notification/NotiHome.tsx
const deleteAlarmItem = async (alarmIds: number[]): Promise<CommonResponse> => {
  try {
    const { data } = await axiosInstance.delete(`/api/alarms`, {
      data: alarmIds,
    });
    return data;
  } catch (error) {
    console.error('Error deleting alarm item:', error);
    throw error;
  }
};

export const useDeleteAlarms = () => {
  return useMutation({
    mutationFn: (alarmIds: number[]) => deleteAlarmItem(alarmIds),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [queryKey.NOTI_LIST],
      });
    },
  });
};
