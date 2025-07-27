import type { External } from './external';
import type { Goal } from './goal';
import type { Issue } from './issue';

// 상태 코드
export const STATUS_CODES = ['NONE', 'IN_PROGRESS', 'TODO', 'FINISH', 'REVIEW', 'DELETE'] as const;
export type StatusCode = (typeof STATUS_CODES)[number];
export const STATUS_LABELS: Record<StatusCode, string> = {
  NONE: '없음',
  IN_PROGRESS: '진행중',
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

// 외부 코드
export const EXTERNAL_CODES = ['GITHUB', 'SLACK'] as const;
export type ExternalCode = (typeof EXTERNAL_CODES)[number];
export const EXTERNAL_LABELS: Record<ExternalCode, string> = {
  GITHUB: 'GitHub',
  SLACK: 'Slack',
};

// 리스트
export const STATUS_LIST: readonly StatusCode[] = STATUS_CODES;
export const PRIORITY_LIST: readonly PriorityCode[] = PRIORITY_CODES;
export const EXTERNAL_LIST: readonly ExternalCode[] = EXTERNAL_CODES;

export const FILTER_MAP = {
  상태: 'state',
  우선순위: 'priority',
  담당자: 'manager',
  목표: 'goal',
  외부: 'external',
} as const;

export type ItemFilter = keyof typeof FILTER_MAP;

// 공통 타입
export type DisplayField = 'status' | 'priority' | 'deadline' | 'manage' | 'goal' | 'external';

// 공통 props
export interface BaseItemProps {
  showCheckbox?: boolean;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  displayFields?: DisplayField[];
  filter?: ItemFilter;
}

export interface GoalItemProps extends Goal, BaseItemProps {
  variant?: 'default' | 'notification';
}

export interface IssueItemProps extends Issue, BaseItemProps {
  variant?: 'default' | 'notification';
}

export interface ExternalItemProps extends External, BaseItemProps {
  variant?: 'default' | 'notification';
}
