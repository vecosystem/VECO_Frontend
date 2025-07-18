import type { Goal } from './goal';
import type { Issue } from './issue';

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

export const FILTER_MAP = {
  상태: 'state',
  우선순위: 'priority',
  담당자: 'manager',
  목표: 'goal',
} as const;

export type ItemFilter = keyof typeof FILTER_MAP;

// 공통 타입
export type DisplayField = 'status' | 'priority' | 'deadline' | 'manage' | 'goal';

// 공통 props
export interface BaseItemProps {
  showCheckbox?: boolean;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  displayFields?: DisplayField[];
  filter?: ItemFilter;
}

export interface GoalItemProps extends Goal, BaseItemProps {}

export interface IssueItemProps extends Issue, BaseItemProps {}
