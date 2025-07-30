import { useQuery } from '@tanstack/react-query';
import type { PaginationDto } from '../../types/common';
import type { AlarmType } from '../../types/listItem';
import { queryKey } from '../../constants/queryKey';
import { getAlarmList } from './alarm';

export const useGetAlarmList = (alarmtype: AlarmType, params: PaginationDto) => {
  return useQuery({
    queryKey: [queryKey.NOTI_LIST, alarmtype, params],
    queryFn: () => getAlarmList(alarmtype, params),
  });
};
