/**
 * useHydrateGoalDetail.ts
 * 목표 상세 조회 데이터 1회 하이드레이션 훅
 * - 최초 1회만 상태/에디터에 주입
 */

import { useEffect, useRef } from 'react';
import type { SubmitHandleRef } from '../components/DetailView/TextEditor/lexical-plugins/SubmitHandlePlugin';
import type { StatusCode, PriorityCode } from '../types/listItem';
import type { ViewGoalDetailDto } from '../types/goal';

type Params = {
  goalDetail?: ViewGoalDetailDto | undefined;
  goalId?: number;
  editorRef: React.RefObject<SubmitHandleRef | null>;

  // 외부 옵션/매핑 준비여부 판단용
  workspaceMembers?: Array<{ memberId: number; name: string }>;
  simpleIssues?: Array<{ id: number; title: string }>;
  nameToId: Record<string, number>;

  // 상태 세터들
  setTitle: (v: string) => void;
  setState: (v: StatusCode) => void;
  setPriority: (v: PriorityCode) => void;
  setSelectedDate: (v: [Date | null, Date | null]) => void;
  setManagersId: (v: number[]) => void;
  setIssuesId: (v: number[]) => void;
};

export const useHydrateGoalDetail = ({
  goalDetail,
  goalId,
  editorRef,
  workspaceMembers,
  simpleIssues,
  nameToId,
  setTitle,
  setState,
  setPriority,
  setSelectedDate,
  setManagersId,
  setIssuesId,
}: Params) => {
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (!goalDetail) return;
    if (!Number.isFinite(goalId)) return;
    if (hydratedRef.current) return;

    // 옵션 준비여부 판단 (담당자/이슈가 존재한다면 옵션이 준비된 다음에만 세팅)
    const membersReady =
      (workspaceMembers?.length ?? 0) > 0 || (goalDetail.managers?.cnt ?? 0) === 0;
    const issuesReady = (simpleIssues?.length ?? 0) > 0 || (goalDetail.issues?.cnt ?? 0) === 0;
    if (!membersReady || !issuesReady) return;

    // 1) 기본 필드
    setTitle(goalDetail.title ?? '');
    setState((goalDetail.state ?? 'NONE') as StatusCode);
    setPriority((goalDetail.priority ?? 'NONE') as PriorityCode);

    // 2) 기한
    const s = goalDetail.deadline?.start ? new Date(goalDetail.deadline.start) : null;
    const e = goalDetail.deadline?.end ? new Date(goalDetail.deadline.end) : null;
    setSelectedDate([s, e]);

    // 3) 담당자 ids
    if ((goalDetail.managers?.cnt ?? 0) > 0) {
      const managerNames = goalDetail.managers?.info?.map((m) => m.name) ?? [];
      const ids = managerNames
        .map((n) => nameToId[n])
        .filter((v): v is number => typeof v === 'number');
      setManagersId(ids);
    } else {
      setManagersId([]);
    }

    // 4) 이슈 ids
    if ((goalDetail.issues?.cnt ?? 0) > 0) {
      const titleToId = new Map((simpleIssues ?? []).map((i) => [i.title, i.id] as const));
      const ids =
        goalDetail.issues?.info
          ?.map((i) => i.id ?? titleToId.get(i.title))
          .filter((v): v is number => typeof v === 'number') ?? [];
      setIssuesId(ids);
    } else {
      setIssuesId([]);
    }

    // 5) 에디터 역직렬화
    editorRef.current?.loadJson?.(goalDetail.content ?? '');

    hydratedRef.current = true;
  }, [
    goalDetail,
    goalId,
    editorRef,
    workspaceMembers,
    simpleIssues,
    nameToId,
    setTitle,
    setState,
    setPriority,
    setSelectedDate,
    setManagersId,
    setIssuesId,
  ]);
};
