import type { CursorBasedResponse } from './common';

/* 임시 구조, api 명세서 완성 시 변경 필요하면 수정 예정 */

export type Deadline = {
  start: string;
  end: string;
};

export type Goal = {
  id: number;
  title: string;
};

export type ManagerInfo = {
  profileUrl: string;
  name: string;
};

export type Manager = {
  cnt: number;
  info: ManagerInfo[];
};

export type Issue = {
  id: number;
  name: string;
  title: string;
  state?: string;
  priority?: string;
  goal?: Goal;
  deadline: Deadline | string;
  managers?: Manager;
};

export type GroupedIssue = { key: string; items: Issue[] };

export type IssueFilter = {
  filterName: string;
  dataCnt: number;
  issues: Issue[];
};

export type RequestIssueListDto = {
  teamId: string;
  issueIds?: number[];
};

export type ResponseIssueDto = CursorBasedResponse<IssueFilter[]>;

export type SimpleIssue = Pick<Issue, 'id' | 'title'>;

export type SimpleIssueListDto = {
  cnt: number;
  info: SimpleIssue[];
};
