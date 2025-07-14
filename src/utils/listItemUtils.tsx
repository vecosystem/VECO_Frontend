import pr0 from '../assets/icons/pr-0.svg';
import pr1 from '../assets/icons/pr-1.svg';
import pr2 from '../assets/icons/pr-2.svg';
import pr3 from '../assets/icons/pr-3.svg';
import pr4 from '../assets/icons/pr-4.svg';

import type { ItemFilter, DisplayField, StatusCode, PriorityCode } from '../types/listItem';

/* 필터 적용 */
export const getFilter = (filter: ItemFilter = '상태'): DisplayField[] => {
  switch (filter) {
    case '상태':
      return ['priority', 'manage', 'goal'];
    case '우선순위':
      return ['status', 'manage', 'goal'];
    case '담당자':
      return ['status', 'priority', 'goal'];
    case '목표':
      return ['status', 'priority', 'manage'];
    default:
      return ['status', 'priority', 'manage', 'goal'];
  }
};

// TODO : 각 아이콘 사이즈 변경 및 색상 변경 확인

/* 우선순위 아이콘 */
export const getPriorityIcon = (priority: PriorityCode): string => {
  const iconMap: Record<PriorityCode, string> = {
    NONE: pr0,
    LOW: pr1,
    NORMAL: pr2,
    HIGH: pr3,
    URGENT: pr4,
  };
  return iconMap[priority];
};

/* 상태 아이콘 및 색상 */
export const getStatusIcon = (status: StatusCode) => {
  const colorMap: Record<StatusCode, string> = {
    NONE: '#DCDCDC',
    DOING: '#D4B042',
    TODO: '#D44242',
    FINISH: '#75D564',
    REVIEW: '#2e4475',
    DELETE: '#D44242',
  };
  return (
    <span
      className="inline-block w-[1.2rem] h-[1.2rem] rounded-full"
      style={{ background: colorMap[status] }}
    />
  );
};

/* 상태 아이콘 색상만 반환 */
export const getStatusColor = (status: StatusCode): string => {
  const colorMap: Record<StatusCode, string> = {
    NONE: '#DCDCDC',
    DOING: '#D4B042',
    TODO: '#D44242',
    FINISH: '#75D564',
    REVIEW: '#2e4475',
    DELETE: '#D44242',
  };
  return colorMap[status];
};
