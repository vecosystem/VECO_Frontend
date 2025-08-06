type ListItem = {
  id: number;
};

type GroupedList<T extends ListItem> = {
  key: string;
  items: T[];
};

export function mergeGroups<T extends ListItem>(groups: GroupedList<T>[]): GroupedList<T>[] {
  const merged: { [key: string]: T[] } = {};

  for (const group of groups) {
    if (!merged[group.key]) merged[group.key] = [];
    merged[group.key] = [...merged[group.key], ...group.items];
  }

  return Object.entries(merged).map(([key, items]) => ({ key, items }));
}
