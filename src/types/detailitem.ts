import type { StatusCode } from './listItem';

// 상태 코드
export const statusLabelToCode: Record<string, StatusCode> = {
  없음: 'NONE',
  '해야할 일': 'TODO',
  진행중: 'DOING',
  완료: 'FINISH',
  검토: 'REVIEW',
};
