import pr0 from '../assets/icons/pr-0.svg';
import pr1 from '../assets/icons/pr-1.svg';
import pr2 from '../assets/icons/pr-2.svg';
import pr3 from '../assets/icons/pr-3.svg';
import pr4 from '../assets/icons/pr-4.svg';
import trashIcon from '../assets/icons/trash.svg';

import type { ItemFilter, DisplayField, PriorityLevel, Status } from '../types/goal';

/* 필터 적용 */
export const getFilter = (filter: ItemFilter = 'status'): DisplayField[] => {
  switch (filter) {
    case 'status':
      return ['priority', 'deadline', 'manage'];
    case 'priority':
      return ['status', 'deadline', 'manage'];
    case 'manage':
      return ['status', 'priority', 'deadline'];
    default:
      return ['status', 'priority', 'deadline', 'manage'];
  }
};

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
  if (status === '삭제')
    return <img src={trashIcon} alt="삭제" className="w-[2.4rem] h-[2.4rem]" />;

  const colorMap: Record<Status, string> = {
    없음: '#FFFFFF',
    진행중: '#D4B042',
    '해야할 일': '#D44242',
    완료: '#75D564',
    검토: '#2e4475',
    삭제: '#D44242',
  };
  return (
    <span
      style={{
        display: 'inline-block',
        width: '1.2rem',
        height: '1.2rem',
        borderRadius: '50%',
        background: colorMap[status],
      }}
    />
  );
};
