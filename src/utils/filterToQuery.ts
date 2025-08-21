import type { ItemFilter } from '../types/listItem';

export const filterToQuery = (filter: ItemFilter): string => {
  switch (filter) {
    case '상태':
      return 'STATE';
    case '우선순위':
      return 'PRIORITY';
    case '담당자':
      return 'MANAGER';
    case '목표':
      return 'GOAL';
    case '외부':
      return 'EXT_TYPE';
    default:
      return '';
  }
};
