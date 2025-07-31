import type { CommonResponse } from './common';
import type { AlarmType } from './listItem';

export type NotiList = {
  alarmId: number;
  name: string;
  typeId: number;
  title: string;
  state: string;
  priority: string;
  goalTitle?: string;
  read: boolean;
  // TODO : 담당자(본인) 정보 추가
};

export type GroupedList = {
  groupTitle: string; // 필터명
  notiList: NotiList[];
};

export type AlarmFilter = {
  type: AlarmType;
  deadline: string;
  groupedList: GroupedList[];
  totalSize: number;
};

export type RequestAlarmListDto = {
  alarmIds: number[];
};

export type ResponseAlarmDto = CommonResponse<AlarmFilter>;

export type RequestAlarmLFilterDto = {
  alarmtype: string;
};
