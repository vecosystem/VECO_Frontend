import { STATUS_CODES, PRIORITY_CODES, type ItemFilter } from '../types/listItem';

export interface GroupedData<T = any> {
  key: string;
  items: T[];
}

export function getSortedGrouped<T>(
  filter: ItemFilter,
  grouped: GroupedData<T>[]
): GroupedData<T>[] {
  if (filter === '상태') {
    return STATUS_CODES.map((status) => grouped.find((g) => g.key === status)).filter(
      Boolean
    ) as GroupedData<T>[];
  }
  if (filter === '우선순위') {
    return PRIORITY_CODES.map((priority) => grouped.find((g) => g.key === priority)).filter(
      Boolean
    ) as GroupedData<T>[];
  }

  return [
    ...grouped.filter((g) => g.key === '없음'),
    ...grouped.filter((g) => g.key !== '없음').sort((a, b) => a.key.localeCompare(b.key, 'ko')),
  ];
}
