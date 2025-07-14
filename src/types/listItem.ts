// 상태 코드
export const STATUS_CODES = ['NONE', 'DOING', 'TODO', 'FINISH', 'REVIEW', 'DELETE'] as const;
export type StatusCode = (typeof STATUS_CODES)[number];
export const STATUS_LABELS: Record<StatusCode, string> = {
  NONE: '없음',
  DOING: '진행중',
  TODO: '해야할 일',
  FINISH: '완료',
  REVIEW: '검토',
  DELETE: '삭제',
};

// 우선순위 코드
export const PRIORITY_CODES = ['NONE', 'URGENT', 'HIGH', 'NORMAL', 'LOW'] as const;
export type PriorityCode = (typeof PRIORITY_CODES)[number];
export const PRIORITY_LABELS: Record<PriorityCode, string> = {
  NONE: '없음',
  URGENT: '긴급',
  HIGH: '높음',
  NORMAL: '보통',
  LOW: '낮음',
};

// 리스트
export const STATUS_LIST: readonly StatusCode[] = STATUS_CODES;
export const PRIORITY_LIST: readonly PriorityCode[] = PRIORITY_CODES;

// 공통 타입
export type DisplayField = 'status' | 'priority' | 'deadline' | 'manage' | 'goal';
export type ItemFilter = '상태' | '우선순위' | '담당자' | '목표';

// 공통 props
export interface BaseItemProps {
  showCheckbox?: boolean;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  status: StatusCode;
  priority: PriorityCode;
  deadline?: string;
  manage?: string;
  displayFields?: DisplayField[];
  filter?: ItemFilter;
}

export interface GoalItemProps extends BaseItemProps {
  goalId: string;
  title: string;
}

export interface IssueItemProps extends BaseItemProps {
  issueId: string;
  issueTitle: string;
  goalTitle?: string;
}
