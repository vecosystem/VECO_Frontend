import type { CommonResponse, CursorBasedResponse } from './common';
import type { SimpleIssueListDto } from './issue';

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
  deadline: Deadline;
  issueId: number[];
};

export type CreateGoalResultDto = CreateGoalDetailDto;

export type ResponseCreateGoalDetailDto = CommonResponse<CreateGoalResultDto>;

// 개별 댓글
export type GoalComment = {
  name: string;
  profileUrl: string;
  content: string;
  createdAt: string; // ISO datetime string
};

//댓글 리스트
export type GoalCommentListDto = {
  cnt: number;
  info: GoalComment[];
};

// 목표 상세 조회
export type ViewGoalDetailDto = {
  name: string; // id랑 name 둘다 주시는 걸로 서버에서 변경해주실 것. 변경되면 반영.
  title: string;
  content: string;
  state: string; // 이거 현재 스웨거에 누락되어있음. 일단 요청해두기.
  priority: string;
  managers: Manager;
  deadline: Deadline;
  issues: SimpleIssueListDto;
  comments: GoalCommentListDto;
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
  issuesId?: number[] | null; // 변수명 통일 여부 물어보기
};

type UpdatableGoalFields = {
  // 응답: 변경된 필드만 내려오기 때문에 Partial로 정의
  title: string;
  content: string;
  state: string;
  priority: string;
  managersId: number[];
  deadline: Deadline;
  issuesId: number[]; // 변수명 통일 여부 물어보기
};

export type UpdateGoalResultDto = Partial<UpdatableGoalFields>;

export type ResponseUpdateGoalDetailDto = CommonResponse<UpdateGoalResultDto>;
