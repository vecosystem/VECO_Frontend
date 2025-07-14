export function getManagers<T extends { manage?: string }>(list: T[]): string[] {
  const set = new Set(list.map((i) => (!i.manage || i.manage === '' ? '없음' : i.manage)));
  const arr = Array.from(set).filter((m) => m !== '없음');
  return ['없음', ...arr];
}

export function getGoals<T extends { goalTitle?: string }>(list: T[]): string[] {
  const set = new Set(list.map((i) => (!i.goalTitle || i.goalTitle === '' ? '없음' : i.goalTitle)));
  const arr = Array.from(set).filter((g) => g !== '없음');
  return ['없음', ...arr];
}
