import { useEffect, useRef, useCallback } from 'react';
import { buildDeadlinePatch } from '../utils/deadlinePatch';
import type { UpdateIssueDetailDto } from '../types/issue';

type UseIssueDeadlinePatchParams = {
  issueDetail: any;
  isViewMode: boolean;
  canPatch: boolean;
  mutateUpdate: (payload: UpdateIssueDetailDto, opts?: { onSuccess?: () => void }) => void;
};

/**
 * - issueDetail의 기존 deadline(start/end)을 기억
 * - 달력 onSelect / edit 제출 시 변경분만 계산해 PATCH 전송
 */
export function useIssueDeadlinePatch({
  issueDetail,
  isViewMode,
  canPatch,
  mutateUpdate,
}: UseIssueDeadlinePatchParams) {
  const originalDeadlineRef = useRef<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });

  // goalDetail 변경 시 원본 저장
  useEffect(() => {
    const prevStart =
      issueDetail?.deadline?.start && typeof issueDetail.deadline.start === 'string'
        ? issueDetail.deadline.start
        : null;
    const prevEnd =
      issueDetail?.deadline?.end && typeof issueDetail.deadline.end === 'string'
        ? issueDetail.deadline.end
        : null;
    originalDeadlineRef.current = { start: prevStart, end: prevEnd };
  }, [issueDetail]);

  /** view 모드에서 달력 선택 → 즉시 PATCH */
  const handleSelectDateAndPatch = useCallback(
    (date: [Date | null, Date | null]) => {
      if (!isViewMode || !canPatch) return;

      const [nextStart, nextEnd] = date;
      const patch = buildDeadlinePatch(
        originalDeadlineRef.current.start,
        originalDeadlineRef.current.end,
        nextStart,
        nextEnd
      );

      if (!patch) return;

      mutateUpdate(patch, {
        onSuccess: () => {
          // 전송 성공 시 원본 갱신
          const d = patch.deadline;
          originalDeadlineRef.current = {
            start:
              d.start !== undefined
                ? d.start === 'null'
                  ? null
                  : d.start
                : originalDeadlineRef.current.start,
            end:
              d.end !== undefined
                ? d.end === 'null'
                  ? null
                  : d.end
                : originalDeadlineRef.current.end,
          };
        },
      });
    },
    [isViewMode, canPatch, mutateUpdate]
  );

  /** edit 모드에서 '작성 완료' 시 선택된 날짜로 PATCH 조각 생성 */
  const buildPatchForEditSubmit = useCallback((date: [Date | null, Date | null]) => {
    const [nextStart, nextEnd] = date;
    return buildDeadlinePatch(
      originalDeadlineRef.current.start,
      originalDeadlineRef.current.end,
      nextStart,
      nextEnd
    );
  }, []);

  return {
    handleSelectDateAndPatch,
    buildPatchForEditSubmit,
  };
}
