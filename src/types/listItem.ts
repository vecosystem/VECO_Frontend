// 공통 타입
export type PriorityLevel = '없음' | '낮음' | '보통' | '높음' | '긴급';
export type Status = '없음' | '진행중' | '해야할 일' | '완료' | '검토';

export type DisplayField = 'status' | 'priority' | 'deadline' | 'manage' | 'goal';
export type ItemFilter = '상태' | '우선순위' | '담당자' | '목표';

// 타입 리스트
export const STATUS_LIST: Status[] = ['없음', '진행중', '해야할 일', '완료', '검토'];
export const PRIORITY_LIST: PriorityLevel[] = ['없음', '긴급', '높음', '보통', '낮음'];

// 공통 props
export interface BaseItemProps {
  showCheckbox?: boolean;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  status: Status;
  priority: PriorityLevel;
  deadline?: string;
  manage?: string;
  displayFields?: DisplayField[];
  filter?: ItemFilter;
}

export interface GoalItemProps extends BaseItemProps {
  type?: 'goal' | 'my-goal';
  goalId: string;
  title: string;
}

export interface IssueItemProps extends BaseItemProps {
  type?: 'issue' | 'my-issue';
  issueId: string;
  issueTitle: string;
  goalTitle?: string;
}
