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

      // TODO : optimistic update 추후 적용
      queryClient.setQueriesData({ queryKey: [queryKey.NOTI_LIST] }, (oldData: any) => {
        if (!oldData?.result?.groupedList) return oldData;

        return {
          ...oldData,
          result: {
            ...oldData.result,
            groupedList: oldData.result.groupedList.map((group: any) => ({
              ...group,
              notiList: group.notiList.map((item: any) =>
                item.alarmId === variables.alarmId ? { ...item, read: true } : item
              ),
            })),
          },
        };
      });

      // 기존 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKey.NOTI_LIST],
      });
    },
  });
};
