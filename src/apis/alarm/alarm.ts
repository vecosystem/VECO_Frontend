import type { RequestAlarmListDto, ResponseAlarmDto } from '../../types/alarm';
import type { CommonResponse, PaginationDto } from '../../types/common';
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

export const deleteAlarmItem = async (alarmIds: RequestAlarmListDto): Promise<CommonResponse> => {
  try {
    const { data } = await axiosInstance.delete(`api/alarms`, {
      data: alarmIds,
    });
    return data;
  } catch (error) {
    console.error('Error deleting alarm item:', error);
    throw error;
  }
};

export const patchAlarmItem = async ({ alarmId }: RequestAlarmListDto): Promise<CommonResponse> => {
  try {
    const { data } = await axiosInstance.patch(`api/alarms/${alarmId}`);
    return data;
  } catch (error) {
    console.error('Error patching alarm item:', error);
    throw error;
  }
};
