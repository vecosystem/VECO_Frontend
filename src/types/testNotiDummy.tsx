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
            isRead: true,
            managerList: [
              {
                profileUrl:
                  'data:image/jpeg;base64,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',
                name: '김선화',
              },
            ],
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: true,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            externalTool: 'SLACK',
            isRead: false,
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
            isRead: false,
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
            isRead: false,
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
            isRead: true,
          },
        ],
      },
    ],
    totalSize: 2,
  },
};
