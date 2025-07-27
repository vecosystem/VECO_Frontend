import type { CommonResponse } from './common';

export type NotiList = {
  alarmId: number;
  name: string;
  typeId: number;
  title: string;
  state: string;
  priority: string;
  goalTitle: string;
  read: boolean;
};

export type GroupedList = {
  groupTitle: string;
  notiList: NotiList[];
};

export type AlarmFilter = {
  type: string;
  deadline: string;
  groupedList: GroupedList[];
  totalSize: number;
};

export type ResponseAlarmDto = CommonResponse<AlarmFilter[]>;
