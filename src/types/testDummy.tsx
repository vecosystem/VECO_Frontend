import type { GoalFilter } from './goal';
import type { IssueFilter } from './issue';

export const dummyStatusGoalGroups: GoalFilter[] = [
  {
    filterName: 'NONE',
    dataCnt: 1,
    goals: [
      {
        id: 1,
        name: 'Veco-g1',
        title: '백호를 사용해서 다른 사람들과 협업해보기',
        priority: 'HIGH',
        deadline: { start: '2025-05-01', end: '2025-05-01' },
        managers: {
          cnt: 2,
          info: [
            { profileUrl: '', name: '염주원' },
            { profileUrl: '', name: '김선화' },
          ],
        },
      },
    ],
  },
  {
    filterName: 'DOING',
    dataCnt: 2,
    goals: [
      {
        id: 2,
        name: 'Veco-g2',
        title: '백호를 사용해서 다른 사람들과 협업해보기',
        priority: 'NORMAL',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '박유민' }],
        },
      },
      {
        id: 3,
        name: 'Veco-g3',
        title: '백호를 사용해서 다른 사람들과 협업해보기',
        // priority: 'HIGH',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '김선화' }],
        },
      },
    ],
  },
  {
    filterName: 'FINISH',
    dataCnt: 1,
    goals: [
      {
        id: 4,
        name: 'Veco-g4',
        title: '백호를 사용해서 다른 사람들과 협업해보기',
        priority: 'URGENT',
        deadline: { start: '', end: '' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '이가을' }],
        },
      },
    ],
  },
  {
    filterName: 'REVIEW',
    dataCnt: 1,
    goals: [
      {
        id: 5,
        name: 'Veco-g5',
        title: '백호를 사용해서 다른 사람들과 협업해보기',
        priority: 'LOW',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
        managers: {
          cnt: 0,
          info: [],
        },
      },
    ],
  },
];

export const dummyPriorityGoalGroups: GoalFilter[] = [
  {
    filterName: 'HIGH',
    dataCnt: 2,
    goals: [
      {
        id: 1,
        name: 'Veco-g1',
        title: '백호를 사용해서 다른 사람들과 협업해보기',
        status: 'DOING',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
        managers: {
          cnt: 2,
          info: [
            { profileUrl: '', name: '염주원' },
            { profileUrl: '', name: '김선화' },
          ],
        },
      },
      {
        id: 3,
        name: 'Veco-g3',
        title: '다른 사람들과 협업하기',
        status: 'DOING',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '김선화' }],
        },
      },
    ],
  },
  {
    filterName: 'NORMAL',
    dataCnt: 1,
    goals: [
      {
        id: 2,
        name: 'Veco-g2',
        title: '기획안 작성하기',
        status: 'DOING',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '박유민' }],
        },
      },
    ],
  },
  {
    filterName: 'URGENT',
    dataCnt: 1,
    goals: [
      {
        id: 4,
        name: 'Veco-g4',
        title: '데모 준비',
        status: 'FINISH',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '이가을' }],
        },
      },
    ],
  },
  {
    filterName: 'LOW',
    dataCnt: 1,
    goals: [
      {
        id: 5,
        name: 'Veco-g5',
        title: '백엔드 문서 작성',
        status: 'REVIEW',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '박진주' }],
        },
      },
    ],
  },
];

export const dummyManagerGoalGroups: GoalFilter[] = [
  {
    filterName: '염주원',
    dataCnt: 1,
    goals: [
      {
        id: 1,
        name: 'Veco-g1',
        title: '백호를 사용해서 다른 사람들과 협업해보기',
        status: 'NONE',
        priority: 'HIGH',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
      },
    ],
  },
  {
    filterName: '김선화',
    dataCnt: 2,
    goals: [
      {
        id: 3,
        name: 'Veco-g3',
        title: '다른 사람들과 협업하기',
        status: 'DOING',
        priority: 'HIGH',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
      },
      {
        id: 5,
        name: 'Veco-g5',
        title: '백엔드 문서 작성',
        status: 'REVIEW',
        priority: 'LOW',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
      },
    ],
  },
  {
    filterName: '박유민',
    dataCnt: 1,
    goals: [
      {
        id: 2,
        name: 'Veco-g2',
        title: '기획안 작성하기',
        status: 'DOING',
        priority: 'NORMAL',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
      },
    ],
  },
  {
    filterName: '이가을',
    dataCnt: 1,
    goals: [
      {
        id: 4,
        name: 'Veco-g4',
        title: '데모 준비',
        status: 'FINISH',
        priority: 'URGENT',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
      },
    ],
  },
  {
    filterName: '박진주',
    dataCnt: 1,
    goals: [
      {
        id: 5,
        name: 'Veco-g5',
        title: '백엔드 문서 작성',
        status: 'REVIEW',
        priority: 'LOW',
        deadline: { start: '2025-05-01', end: '2025-05-31' },
      },
    ],
  },
];

export const dummyStatusIssueGroups: IssueFilter[] = [
  {
    filterName: 'NONE',
    dataCnt: 1,
    issues: [
      {
        id: 1,
        name: 'Veco-i1',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'NONE',
        priority: 'HIGH',
        goaltitle: '없음',
        deadline: { start: '', end: '' },
        managers: {
          cnt: 2,
          info: [
            { profileUrl: '', name: '염주원' },
            { profileUrl: '', name: '박유민' },
          ],
        },
      },
    ],
  },
  {
    filterName: 'DOING',
    dataCnt: 2,
    issues: [
      {
        id: 2,
        name: 'Veco-i2',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'DOING',
        priority: 'NORMAL',
        goaltitle: '기획 및 요구사항 분석',
        deadline: { start: '2025-05-01', end: '2025-05-02' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '박유민' }],
        },
      },
      {
        id: 3,
        name: 'Veco-i3',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'DOING',
        priority: 'NORMAL',
        goaltitle: '없음',
        deadline: { start: '2025-05-02', end: '2025-05-02' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '김선화' }],
        },
      },
    ],
  },
  {
    filterName: 'FINISH',
    dataCnt: 1,
    issues: [
      {
        id: 4,
        name: 'Veco-i4',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'FINISH',
        priority: 'URGENT',
        goaltitle: '없음',
        deadline: { start: '2025-05-01', end: '2025-05-02' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '이가을' }],
        },
      },
    ],
  },
  {
    filterName: 'REVIEW',
    dataCnt: 1,
    issues: [
      {
        id: 5,
        name: 'Veco-i5',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'REVIEW',
        priority: 'LOW',
        goaltitle: '없음',
        deadline: { start: '2025-05-01', end: '2025-05-03' },
        managers: {
          cnt: 0,
          info: [],
        },
      },
    ],
  },
];

export const dummyPriorityIssueGroups: IssueFilter[] = [
  {
    filterName: 'HIGH',
    dataCnt: 2,
    issues: [
      {
        id: 1,
        name: 'Veco-i1',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'NONE',
        priority: 'HIGH',
        goaltitle: '없음',
        deadline: { start: '', end: '' },
        managers: {
          cnt: 2,
          info: [
            { profileUrl: '', name: '염주원' },
            { profileUrl: '', name: '박유민' },
          ],
        },
      },
      {
        id: 2,
        name: 'Veco-i2',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'DOING',
        priority: 'HIGH',
        goaltitle: '기획 및 요구사항 분석',
        deadline: { start: '2025-05-01', end: '2025-05-02' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '박유민' }],
        },
      },
    ],
  },
  {
    filterName: 'NORMAL',
    dataCnt: 1,
    issues: [
      {
        id: 3,
        name: 'Veco-i3',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'DOING',
        priority: 'NORMAL',
        goaltitle: '없음',
        deadline: { start: '2025-05-02', end: '2025-05-02' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '김선화' }],
        },
      },
    ],
  },
  {
    filterName: 'URGENT',
    dataCnt: 1,
    issues: [
      {
        id: 4,
        name: 'Veco-i4',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'FINISH',
        priority: 'URGENT',
        goaltitle: '없음',
        deadline: { start: '2025-05-01', end: '2025-05-02' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '이가을' }],
        },
      },
    ],
  },
  {
    filterName: 'LOW',
    dataCnt: 1,
    issues: [
      {
        id: 5,
        name: 'Veco-i5',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'REVIEW',
        priority: 'LOW',
        goaltitle: '없음',
        deadline: { start: '2025-05-01', end: '2025-05-03' },
        managers: {
          cnt: 0,
          info: [],
        },
      },
    ],
  },
];

export const dummyManagerIssueGroups: IssueFilter[] = [
  {
    filterName: '박유민',
    dataCnt: 2,
    issues: [
      {
        id: 2,
        name: 'Veco-i2',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'DOING',
        priority: 'HIGH',
        goaltitle: '기획 및 요구사항 분석',
        deadline: { start: '2025-05-01', end: '2025-05-02' },
      },
      {
        id: 1,
        name: 'Veco-i1',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'NONE',
        priority: 'HIGH',
        goaltitle: '없음',
        deadline: { start: '', end: '' },
      },
    ],
  },
  {
    filterName: '김선화',
    dataCnt: 1,
    issues: [
      {
        id: 3,
        name: 'Veco-i3',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'DOING',
        priority: 'NORMAL',
        goaltitle: '없음',
        deadline: { start: '2025-05-02', end: '2025-05-02' },
      },
    ],
  },
  {
    filterName: '이가을',
    dataCnt: 1,
    issues: [
      {
        id: 4,
        name: 'Veco-i4',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'FINISH',
        priority: 'URGENT',
        goaltitle: '없음',
        deadline: { start: '2025-05-01', end: '2025-05-02' },
      },
    ],
  },
  {
    filterName: '없음',
    dataCnt: 2,
    issues: [
      {
        id: 1,
        name: 'Veco-i1',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'NONE',
        priority: 'HIGH',
        goaltitle: '없음',
        deadline: { start: '', end: '' },
      },
      {
        id: 5,
        name: 'Veco-i5',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'REVIEW',
        priority: 'LOW',
        goaltitle: '없음',
        deadline: { start: '2025-05-01', end: '2025-05-03' },
      },
    ],
  },
];

export const dummyGoalTitleIssueGroups: IssueFilter[] = [
  {
    filterName: '기획 및 요구사항 분석',
    dataCnt: 1,
    issues: [
      {
        id: 2,
        name: 'Veco-i2',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'DOING',
        priority: 'HIGH',
        goaltitle: '기획 및 요구사항 분석',
        deadline: { start: '2025-05-01', end: '2025-05-02' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '박유민' }],
        },
      },
    ],
  },
  {
    filterName: '없음',
    dataCnt: 4,
    issues: [
      {
        id: 1,
        name: 'Veco-i1',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'NONE',
        priority: 'HIGH',
        goaltitle: '없음',
        deadline: { start: '', end: '' },
        managers: {
          cnt: 0,
          info: [],
        },
      },
      {
        id: 3,
        name: 'Veco-i3',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'DOING',
        priority: 'NORMAL',
        goaltitle: '없음',
        deadline: { start: '2025-05-02', end: '2025-05-02' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '김선화' }],
        },
      },
      {
        id: 4,
        name: 'Veco-i4',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'FINISH',
        priority: 'URGENT',
        goaltitle: '없음',
        deadline: { start: '2025-05-01', end: '2025-05-02' },
        managers: {
          cnt: 1,
          info: [{ profileUrl: '', name: '이가을' }],
        },
      },
      {
        id: 5,
        name: 'Veco-i5',
        title: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
        status: 'REVIEW',
        priority: 'LOW',
        goaltitle: '없음',
        deadline: { start: '2025-05-01', end: '2025-05-03' },
        managers: {
          cnt: 0,
          info: [],
        },
      },
    ],
  },
];
