import pr0 from '../assets/icons/pr-0.svg';
import pr1 from '../assets/icons/pr-1.svg';
import pr2 from '../assets/icons/pr-2.svg';
import pr3 from '../assets/icons/pr-3.svg';
import pr4 from '../assets/icons/pr-4.svg';

import type { ItemFilter, DisplayField, PriorityLevel, Status } from '../types/listItem';

/* 필터 적용 */
export const getFilter = (filter: ItemFilter = '상태'): DisplayField[] => {
  switch (filter) {
    case '상태':
      return ['priority', 'manage'];
    case '우선순위':
      return ['status', 'manage'];
    case '담당자':
      return ['status', 'priority'];
    default:
      return ['status', 'priority', 'manage'];
  }
};

// TODO : 각 아이콘 사이즈 변경 및 색상 변경 확인

/* 우선순위 아이콘 */
export const getPriorityIcon = (priority: PriorityLevel): string => {
  const iconMap: Record<PriorityLevel, string> = {
    없음: pr0,
    낮음: pr1,
    보통: pr2,
    높음: pr3,
    긴급: pr4,
  };
  return iconMap[priority];
};

/* 상태 아이콘 및 색상 */
export const getStatusIcon = (status: Status) => {
  const colorMap: Record<Status, string> = {
    없음: '#FFFFFF',
    진행중: '#D4B042',
    '해야할 일': '#D44242',
    완료: '#75D564',
    검토: '#2e4475',
  };
  return (
    <span
      className="inline-block w-[1.2rem] h-[1.2rem] rounded-full"
      style={{ background: colorMap[status] }}
    />
  );
};

/* 상태 아이콘 색상만 반환 */
export const getStatusColor = (status: Status): string => {
  const colorMap: Record<Status, string> = {
    없음: '#DCDCDC',
    진행중: '#D4B042',
    '해야할 일': '#D44242',
    완료: '#75D564',
    검토: '#2e4475',
  };
  return colorMap[status];
};
