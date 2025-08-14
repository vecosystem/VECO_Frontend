import type { ResponseCommentListDto } from './comment';
import type { CommonResponse, CursorBasedResponse } from './common';
import type { SimpleIssueListDto } from './issue';

export type Deadline = {
  start?: string;
  end?: string;
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
  deadline: Deadline | string;
  managers?: Manager;
};

export type GroupedGoal = { key: string; items: Goal[] };

export type GoalFilter = {
  filterName: string;
  dataCnt: number;
  goals: Goal[];
};

export type RequestGoalListDto = {
  teamId: string;
  goalIds?: number[];
};

export type ResponseGoalDto = CursorBasedResponse<GoalFilter[]>;

export type SimpleGoal = Pick<Goal, 'id' | 'title'>;

export type SimpleGoalListDto = {
  cnt: number;
  info: SimpleGoal[];
};

export type TeamMember = {
  id: number;
  nickname: string;
};

export type TeamMemberListDto = {
  cnt: number;
  info: TeamMember[];
};

// 목표 작성
export type CreateGoalDetailDto = {
  title: string;
  content: string;
  state: string;
  priority: string;
  managersId: number[];
  deadline?: Deadline;
  issuesId: number[];
};

export type CreateGoalResultDto = {
  goalId: number;
  createdAt: string;
};

export type ResponseCreateGoalDetailDto = CommonResponse<CreateGoalResultDto>;

// 목표 상세 조회
export type ViewGoalDetailDto = {
  id: number;
  name: string;
  title: string;
  content: string;
  state: string;
  priority: string;
  managers: Manager;
  deadline: Deadline;
  issues: SimpleIssueListDto;
  comments: ResponseCommentListDto;
};

export type ResponseViewGoalDetailDto = CommonResponse<ViewGoalDetailDto>;

// 목표 수정
export type UpdateGoalDetailDto = {
  // 변경사항이 없는 속성은 Null값 가능, 키 생략(undef)도 가능
  title?: string | null;
  content?: string | null;
  state?: string | null;
  priority?: string | null;
  managersId?: number[] | null;
  deadline?: Deadline | null;
  issuesId?: number[] | null;
};

export type UpdateGoalResultDto = {
  goalId: number;
  updatedAt: string; // LocalDateTime
};

export type ResponseUpdateGoalDetailDto = CommonResponse<UpdateGoalResultDto>;
