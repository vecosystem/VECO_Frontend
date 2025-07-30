// src/types/testNotiDummy.ts

import type { ResponseAlarmDto } from './alarm';

// 목표 알림: 상태 필터
export const dummyGoalAlarmByState: ResponseAlarmDto = {
  isSuccess: true,
  code: 'NOTIFICATION200',
  message: '성공적으로 처리했습니다.',
  result: {
    type: 'GOAL',
    deadline: '2025-07-24',
    groupedList: [
      {
        groupTitle: 'NONE',
        notiList: [
          {
            alarmId: 1,
            name: 'Veco-g1',
            typeId: 1,
            title: '목표 없음 알림',
            state: 'NONE',
            priority: 'NONE',
            read: true,
          },
        ],
      },
      {
        groupTitle: 'IN_PROGRESS',
        notiList: [
          {
            alarmId: 2,
            name: 'Veco-g2',
            typeId: 2,
            title: '진행중 알림',
            state: 'IN_PROGRESS',
            priority: 'HIGH',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'TODO',
        notiList: [
          {
            alarmId: 3,
            name: 'Veco-g3',
            typeId: 3,
            title: '해야할일 알림',
            state: 'TODO',
            priority: 'NORMAL',
            read: false,
          },
        ],
      },
    ],
    totalSize: 3,
  },
};

// 목표 알림: 우선순위 필터
export const dummyGoalAlarmByPriority: ResponseAlarmDto = {
  isSuccess: true,
  code: 'NOTIFICATION200',
  message: '성공적으로 처리했습니다.',
  result: {
    type: 'GOAL',
    deadline: '2025-07-24',
    groupedList: [
      {
        groupTitle: 'NONE',
        notiList: [
          {
            alarmId: 4,
            name: 'Veco-g4',
            typeId: 4,
            title: '우선순위 없음',
            state: 'TODO',
            priority: 'NONE',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'URGENT',
        notiList: [
          {
            alarmId: 5,
            name: 'Veco-g5',
            typeId: 5,
            title: '긴급 알림',
            state: 'IN_PROGRESS',
            priority: 'URGENT',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'HIGH',
        notiList: [
          {
            alarmId: 6,
            name: 'Veco-g6',
            typeId: 6,
            title: '높음 알림',
            state: 'TODO',
            priority: 'HIGH',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'NORMAL',
        notiList: [
          {
            alarmId: 7,
            name: 'Veco-g7',
            typeId: 7,
            title: '보통 알림',
            state: 'IN_PROGRESS',
            priority: 'NORMAL',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'LOW',
        notiList: [
          {
            alarmId: 8,
            name: 'Veco-g8',
            typeId: 8,
            title: '낮음 알림',
            state: 'TODO',
            priority: 'LOW',
            read: false,
          },
        ],
      },
    ],
    totalSize: 5,
  },
};

// 이슈 알림: 상태 필터
export const dummyIssueAlarmByState: ResponseAlarmDto = {
  isSuccess: true,
  code: 'NOTIFICATION200',
  message: '성공적으로 처리했습니다.',
  result: {
    type: 'ISSUE',
    deadline: '2025-07-24',
    groupedList: [
      {
        groupTitle: 'NONE',
        notiList: [
          {
            alarmId: 11,
            name: 'Veco-i11',
            typeId: 11,
            title: '이슈 없음',
            state: 'NONE',
            priority: 'NONE',
            goalTitle: '이슈 없음',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'IN_PROGRESS',
        notiList: [
          {
            alarmId: 12,
            name: 'Veco-i12',
            typeId: 12,
            title: '이슈 진행중',
            state: 'IN_PROGRESS',
            priority: 'HIGH',
            goalTitle: '진행 이슈',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'TODO',
        notiList: [
          {
            alarmId: 13,
            name: 'Veco-i13',
            typeId: 13,
            title: '이슈 해야할일',
            state: 'TODO',
            priority: 'NORMAL',
            goalTitle: '해야할 이슈',
            read: false,
          },
        ],
      },
    ],
    totalSize: 3,
  },
};

// 이슈 알림: 우선순위 필터
export const dummyIssueAlarmByPriority: ResponseAlarmDto = {
  isSuccess: true,
  code: 'NOTIFICATION200',
  message: '성공적으로 처리했습니다.',
  result: {
    type: 'ISSUE',
    deadline: '2025-07-24',
    groupedList: [
      {
        groupTitle: 'NONE',
        notiList: [
          {
            alarmId: 14,
            name: 'Veco-i14',
            typeId: 14,
            title: '이슈 우선순위 없음',
            state: 'TODO',
            priority: 'NONE',
            goalTitle: '이슈 없음',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'URGENT',
        notiList: [
          {
            alarmId: 15,
            name: 'Veco-i15',
            typeId: 15,
            title: '이슈 긴급',
            state: 'IN_PROGRESS',
            priority: 'URGENT',
            goalTitle: '긴급 이슈',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'HIGH',
        notiList: [
          {
            alarmId: 16,
            name: 'Veco-i16',
            typeId: 16,
            title: '이슈 높음',
            state: 'TODO',
            priority: 'HIGH',
            goalTitle: '높음 이슈',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'NORMAL',
        notiList: [
          {
            alarmId: 17,
            name: 'Veco-i17',
            typeId: 17,
            title: '이슈 보통',
            state: 'IN_PROGRESS',
            priority: 'NORMAL',
            goalTitle: '보통 이슈',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'LOW',
        notiList: [
          {
            alarmId: 18,
            name: 'Veco-i18',
            typeId: 18,
            title: '이슈 낮음',
            state: 'TODO',
            priority: 'LOW',
            goalTitle: '낮음 이슈',
            read: false,
          },
        ],
      },
    ],
    totalSize: 5,
  },
};

// 이슈 알림: 목표 필터
export const dummyIssueAlarmByGoal: ResponseAlarmDto = {
  isSuccess: true,
  code: 'NOTIFICATION200',
  message: '성공적으로 처리했습니다.',
  result: {
    type: 'ISSUE',
    deadline: '2025-07-24',
    groupedList: [
      {
        groupTitle: '목표 없음',
        notiList: [
          {
            alarmId: 19,
            name: 'Veco-i19',
            typeId: 19,
            title: '이슈 목표 없음',
            state: 'NONE',
            priority: 'NONE',
            goalTitle: '목표 없음',
            read: false,
          },
        ],
      },
      {
        groupTitle: '가나다 목표',
        notiList: [
          {
            alarmId: 20,
            name: 'Veco-i20',
            typeId: 20,
            title: '이슈 가나다 목표',
            state: 'IN_PROGRESS',
            priority: 'HIGH',
            goalTitle: '가나다 목표',
            read: false,
          },
        ],
      },
    ],
    totalSize: 2,
  },
};

// 외부 알림: 상태 필터
export const dummyExternalAlarmByState: ResponseAlarmDto = {
  isSuccess: true,
  code: 'NOTIFICATION200',
  message: '성공적으로 처리했습니다.',
  result: {
    type: 'EXTERNAL',
    deadline: '2025-07-24',
    groupedList: [
      {
        groupTitle: 'NONE',
        notiList: [
          {
            alarmId: 31,
            name: 'Veco-e31',
            typeId: 31,
            title: '외부 없음',
            state: 'NONE',
            priority: 'NONE',
            goalTitle: '외부 없음',
            read: true,
          },
        ],
      },
      {
        groupTitle: 'IN_PROGRESS',
        notiList: [
          {
            alarmId: 32,
            name: 'Veco-e32',
            typeId: 32,
            title: '외부 진행중',
            state: 'IN_PROGRESS',
            priority: 'HIGH',
            goalTitle: '진행 외부',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'TODO',
        notiList: [
          {
            alarmId: 33,
            name: 'Veco-e33',
            typeId: 33,
            title: '외부 해야할일',
            state: 'TODO',
            priority: 'NORMAL',
            goalTitle: '해야할 외부',
            read: false,
          },
        ],
      },
    ],
    totalSize: 3,
  },
};

// 외부 알림: 우선순위 필터
export const dummyExternalAlarmByPriority: ResponseAlarmDto = {
  isSuccess: true,
  code: 'NOTIFICATION200',
  message: '성공적으로 처리했습니다.',
  result: {
    type: 'EXTERNAL',
    deadline: '2025-07-24',
    groupedList: [
      {
        groupTitle: 'NONE',
        notiList: [
          {
            alarmId: 34,
            name: 'Veco-e34',
            typeId: 34,
            title: '외부 우선순위 없음',
            state: 'TODO',
            priority: 'NONE',
            goalTitle: '외부 없음',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'URGENT',
        notiList: [
          {
            alarmId: 35,
            name: 'Veco-e35',
            typeId: 35,
            title: '외부 긴급',
            state: 'IN_PROGRESS',
            priority: 'URGENT',
            goalTitle: '긴급 외부',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'HIGH',
        notiList: [
          {
            alarmId: 36,
            name: 'Veco-e36',
            typeId: 36,
            title: '외부 높음',
            state: 'TODO',
            priority: 'HIGH',
            goalTitle: '높음 외부',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'NORMAL',
        notiList: [
          {
            alarmId: 37,
            name: 'Veco-e37',
            typeId: 37,
            title: '외부 보통',
            state: 'IN_PROGRESS',
            priority: 'NORMAL',
            goalTitle: '보통 외부',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'LOW',
        notiList: [
          {
            alarmId: 38,
            name: 'Veco-e38',
            typeId: 38,
            title: '외부 낮음',
            state: 'TODO',
            priority: 'LOW',
            goalTitle: '낮음 외부',
            read: false,
          },
        ],
      },
    ],
    totalSize: 5,
  },
};

// 외부 알림: 목표 필터
export const dummyExternalAlarmByGoal: ResponseAlarmDto = {
  isSuccess: true,
  code: 'NOTIFICATION200',
  message: '성공적으로 처리했습니다.',
  result: {
    type: 'EXTERNAL',
    deadline: '2025-07-24',
    groupedList: [
      {
        groupTitle: '외부 목표 없음',
        notiList: [
          {
            alarmId: 39,
            name: 'Veco-e39',
            typeId: 39,
            title: '외부 목표 없음',
            state: 'NONE',
            priority: 'NONE',
            goalTitle: '목표 없음',
            read: false,
          },
        ],
      },
      {
        groupTitle: '외부 가나다 목표',
        notiList: [
          {
            alarmId: 40,
            name: 'Veco-e40',
            typeId: 40,
            title: '외부 가나다 목표',
            state: 'IN_PROGRESS',
            priority: 'HIGH',
            goalTitle: '가나다 목표',
            read: false,
          },
        ],
      },
    ],
    totalSize: 2,
  },
};

// 외부 알림: 외부툴 필터
export const dummyExternalAlarmByTool: ResponseAlarmDto = {
  isSuccess: true,
  code: 'NOTIFICATION200',
  message: '성공적으로 처리했습니다.',
  result: {
    type: 'EXTERNAL',
    deadline: '2025-07-24',
    groupedList: [
      {
        groupTitle: 'SLACK',
        notiList: [
          {
            alarmId: 42,
            name: 'Veco-e42',
            typeId: 42,
            title: '슬랙 연동',
            state: 'IN_PROGRESS',
            priority: 'HIGH',
            goalTitle: '슬랙 목표',
            read: false,
          },
        ],
      },
      {
        groupTitle: 'GITHUB',
        notiList: [
          {
            alarmId: 43,
            name: 'Veco-e43',
            typeId: 43,
            title: '깃허브 연동',
            state: 'NONE',
            priority: 'URGENT',
            goalTitle: '깃허브 목표',
            read: true,
          },
        ],
      },
    ],
    totalSize: 2,
  },
};
