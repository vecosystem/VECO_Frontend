import { useQuery } from '@tanstack/react-query';
import type { PaginationDto } from '../../types/common';
import type { AlarmType } from '../../types/listItem';
import { queryKey } from '../../constants/queryKey';
import type { ResponseAlarmDto } from '../../types/alarm';
import { axiosInstance } from '../axios';

// notification/NotiHome.tsx
const getAlarmList = async (
  alarmtype: AlarmType,
  paginationDto: PaginationDto
): Promise<ResponseAlarmDto> => {
  try {
    const { query } = paginationDto;
    const { data } = await axiosInstance.get(`api/alarms/${alarmtype}`, {
      params: { query },
    });
    return data;
  } catch (error) {
    console.error('Error fetching alarm list:', error);
    throw error;
  }
};

export const useGetAlarmList = (alarmtype: AlarmType, params: PaginationDto) => {
  return useQuery({
    queryKey: [queryKey.NOTI_LIST, alarmtype, params],
    queryFn: () => getAlarmList(alarmtype, params),
  });
};
