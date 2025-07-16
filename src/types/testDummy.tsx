import type { GoalFilter } from './goal';

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
