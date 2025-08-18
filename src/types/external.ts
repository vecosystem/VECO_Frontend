import type { ResponseCommentListDto } from './comment';
import type { CommonResponse, CursorBasedResponse } from './common';
import type { Goal } from './issue';

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

export type External = {
  id: number;
  name: string;
  title: string;
  status?: string;
  priority?: string;
  goaltitle?: string;
  deadline: Deadline | string;
  managers?: Manager;
  extServiceType?: string;
};

export type GroupedExternal = { key: string; items: External[] };

export type ExternalFilter = {
  filterName: string;
  dataCnt: number;
  externals: External[];
};

export type RequestExternalListDto = {
  teamId: string;
  externalIds?: number[];
};

export type ResponseExternalDto = CursorBasedResponse<ExternalFilter[]>;

// 외부 이슈 생성
export type CreateExternalDetailDto = {
  owner?: string;
  repo?: string;
  installationId?: number;
  title: string;
  content: string;
  state: string;
  priority: string;
  managersId: number[];
  deadline?: Deadline;
  extServiceType: string;
  goalId?: number; // TODO: 이거 필수 요소 아닌 채로도 가능한지 확인
};

export type CreateExternalResultDto = {
  externalId: number;
  createdAt: string;
};

export type ResponseCreateExternalDetatilDto = CommonResponse<CreateExternalResultDto>;

// 외부 이슈 조회
export type ViewExternalDetailDto = {
  id: number;
  name: string;
  title: string;
  content: string;
  priority: string;
  state: string;
  startDate?: string | null; // TODO: 빼야 할 듯
  endDate?: string | null; // TODO: 빼야 할 듯
  goalId?: Pick<Goal, 'id'>; // TODO: 데이터 구조 통일해달라고 하기
  goalTitle?: Pick<Goal, 'title'>; // TODO: 데이터 구조 통일해달라고 하기
  extServiceType: string;
  managers: Manager;
  deadlines: Deadline; // TODO: 이름 통일해달라고 하기
  comments: ResponseCommentListDto;
};

export type ResponseViewExternalDetailDto = CommonResponse<ViewExternalDetailDto>;

// 외부 이슈 수정
export type UpdateExternalDetailDto = {
  // 변경사항이 없는 속성은 Null값 가능, 키 생략(undef)도 가능
  title?: string | null;
  content?: string | null;
  state?: string | null;
  priority?: string | null;
  managersId?: number[] | null;
  deadline?: Deadline | null;
  goalId?: number | null;
};

export type UpdateExternalResultDto = {
  externalId: number;
  updatedAt: string; // LocalDateTime
};

export type ResponseUpdateExternalDetailDto = CommonResponse<UpdateExternalResultDto>;
