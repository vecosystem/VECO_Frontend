import { useState, useMemo } from 'react';

export default function useCheckItems<T extends { [key: string]: any }>(
  items: T[],
  idKey: keyof T = 'id'
) {
  const [checkedIds, setCheckedIds] = useState<(string | number)[]>([]);

  const allIds = useMemo(() => items.map((item) => item[idKey] ?? ''), [items, idKey]);
  const isAllChecked = items.length > 0 && allIds.every((id) => checkedIds.includes(id));

  const handleCheck = (id: string | number, checked: boolean) => {
    setCheckedIds((prev) => (checked ? [...prev, id] : prev.filter((v) => v !== id)));
  };

  const handleSelectAll = (checked: boolean) => {
    setCheckedIds(checked ? allIds : []);
  };

  return { checkedIds, isAllChecked, handleCheck, handleSelectAll, setCheckedIds };
}
