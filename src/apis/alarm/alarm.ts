import type { ResponseAlarmDto } from '../../types/alarm';
import type { PaginationDto } from '../../types/common';
import type { AlarmType } from '../../types/listItem';
import { axiosInstance } from '../axios';

export const getAlarmList = async (
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
