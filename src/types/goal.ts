// 목표 아이템 타입
export type PriorityLevel = '없음' | '낮음' | '보통' | '높음' | '긴급';
export type Status = '없음' | '진행중' | '해야할 일' | '완료' | '검토' | '삭제';

export type DisplayField = 'status' | 'priority' | 'deadline' | 'manage';
export type ItemFilter = 'status' | 'priority' | 'manage';

export interface GoalItemProps {
  showCheckbox?: boolean;
  checked?: boolean;
  type?: 'goal' | 'my-goal';
  goalId: string;
  title: string;
  status: Status;
  priority: PriorityLevel;
  deadline: string;
  manage: string;
  displayFields?: DisplayField[];
  filter?: ItemFilter;
}

export interface IssueItemProps {
  showCheckbox?: boolean;
  checked?: boolean;
  type?: 'issue' | 'my-issue';
  issueId: string;
  issueTitle: string;
  goalTitle: string;
  status: Status;
  priority: PriorityLevel;
  deadline: string;
  manage: string;
  displayFields?: DisplayField[];
  filter?: ItemFilter;
}
