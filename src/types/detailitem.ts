import { STATUS_LABELS, PRIORITY_LABELS, type StatusCode, type PriorityCode } from './listItem';

// 객체 뒤집기(라벨 -> 코드) 유틸
const invertRecord = <K extends string, V extends string>(obj: Record<K, V>) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k])) as Record<V, K>;

// 라벨 ↔ 코드 매핑 (단일 소스: STATUS_LABELS / PRIORITY_LABELS)
export const statusLabelToCode: Record<string, StatusCode> = invertRecord(STATUS_LABELS);
export const priorityLabelToCode: Record<string, PriorityCode> = invertRecord(PRIORITY_LABELS);
