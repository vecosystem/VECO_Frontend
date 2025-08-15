import { formatDateHyphen } from '../utils/formatDate';

/**
 * 업데이트 규칙(수정 단계에서 추가/변경/삭제 모두 허용):
 * - start: YYYY-MM-DD 로 추가/변경 가능, null 로 삭제 가능
 * - end  : YYYY-MM-DD 로 추가/변경 가능, null 로 삭제 가능
 *
 * 동작:
 * - prev(start|end) ↔ next(start|end)를 비교하여 "변경된 필드만" deadline에 포함
 * - next가 null이면 "null"(문자열)로 전송 (서버 규약 유지)
 * - 변경이 없으면 undefined 반환 (deadline 제외)
 */
export function buildDeadlinePatch(
  prevStart: string | null,
  prevEnd: string | null,
  nextStart: Date | null,
  nextEnd: Date | null
): { deadline: { start?: string; end?: string } } | undefined {
  const nextStartStr = nextStart ? formatDateHyphen(nextStart) : null; // 보통 null
  const nextEndStr = nextEnd ? formatDateHyphen(nextEnd) : null;

  const changed: { start?: string; end?: string } = {};
  // start 비교
  const isStartChanged =
    (prevStart === null && nextStartStr !== null) || // 추가
    (prevStart !== null && nextStartStr === null) || // 삭제
    (prevStart !== null && nextStartStr !== null && prevStart !== nextStartStr); // 값 변경

  if (isStartChanged) {
    changed.start = nextStartStr ?? 'null';
  }

  // end 비교
  const isEndChanged =
    (prevEnd === null && nextEndStr !== null) ||
    (prevEnd !== null && nextEndStr === null) ||
    (prevEnd !== null && nextEndStr !== null && prevEnd !== nextEndStr);

  if (isEndChanged) {
    changed.end = nextEndStr ?? 'null';
  }

  return Object.keys(changed).length ? { deadline: changed } : undefined;
}
