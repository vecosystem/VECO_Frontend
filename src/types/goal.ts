import type { CursorBasedResponse } from './common';

export type Deadline = {
  start: string;
  end: string;
};

export type ManagerInfo = {
  profileUrl: string;
  name: string;
};

export type Manager = {
  cnt: number;
  info: ManagerInfo[];
};

export type Goal = {
  id: number;
  name: string;
  title: string;
  state?: string;
  priority?: string;
  deadline: Deadline;
  managers?: Manager;
};

export type GroupedGoal = { key: string; items: Goal[] };

export type GoalFilter = {
  filterName: string;
  dataCnt: number;
  goals: Goal[];
};

export type ResponseGoalDto = CursorBasedResponse<GoalFilter[]>;
