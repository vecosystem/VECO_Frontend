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
  isRead: boolean;
  // TODO : teamId 정보 추가, 명세서 확인 후 수정
  managerList?: {
    profileUrl: string;
    name: string;
  }[];
  externalTool?: string;
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
  alarmId?: number;
  alarmIds?: number[];
};

export type ResponseAlarmDto = CommonResponse<AlarmFilter>;

export type RequestAlarmLFilterDto = {
  alarmtype: string;
};
