// src/hooks/useHydrateIssueDetail.ts
import { useEffect, useRef } from 'react';
import type { SubmitHandleRef } from '../components/DetailView/TextEditor/lexical-plugins/SubmitHandlePlugin';
import type { StatusCode, PriorityCode } from '../types/listItem';
import type { ViewIssueDetailDto } from '../types/issue';
import type { SimpleGoal } from '../types/goal';

type Params = {
  issueDetail?: ViewIssueDetailDto | undefined;
  issueId?: number;
  editorRef: React.RefObject<SubmitHandleRef | null>;

  // 외부 옵션/매핑 준비여부 판단용
  workspaceMembers?: Array<{ memberId: number; name: string }>;
  simpleGoals?: SimpleGoal[]; // 목표 연결용 간단 목록
  nameToId: Record<string, number>;

  // 상태 세터들
  setTitle: (v: string) => void;
  setState: (v: StatusCode) => void;
  setPriority: (v: PriorityCode) => void;
  setSelectedDate: (v: [Date | null, Date | null]) => void;
  setManagersId: (v: number[]) => void;
  setGoalId: (v: number | null) => void; // 단일 선택(없음 가능)
};

export const useHydrateIssueDetail = ({
  issueDetail,
  issueId,
  editorRef,
  workspaceMembers,
  simpleGoals,
  nameToId,
  setTitle,
  setState,
  setPriority,
  setSelectedDate,
  setManagersId,
  setGoalId,
}: Params) => {
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (!issueDetail) return;
    if (!Number.isFinite(issueId)) return;
    if (hydratedRef.current) return;

    // 옵션 준비여부 판단
    // - 담당자가 존재하면 멤버 옵션 준비 필요
    const membersReady =
      (workspaceMembers?.length ?? 0) > 0 || (issueDetail.managers?.cnt ?? 0) === 0;

    // - 목표 연결(단일) 세팅용: 서버 응답에 goal.id가 있으면 바로 세팅 가능
    //   goal.id가 없고 title만 있을 경우, simpleGoals 준비 후 title->id 매핑 필요
    const needGoalsByTitle = !!issueDetail.goal?.title && issueDetail.goal?.id == null;
    const goalsReady = needGoalsByTitle ? (simpleGoals?.length ?? 0) > 0 : true;

    if (!membersReady || !goalsReady) return;

    // 1) 기본 필드
    setTitle(issueDetail.title ?? '');
    setState((issueDetail.state ?? 'NONE') as StatusCode);
    setPriority((issueDetail.priority ?? 'NONE') as PriorityCode);

    // 2) 기한
    const s = issueDetail.deadline?.start ? new Date(issueDetail.deadline.start) : null;
    const e = issueDetail.deadline?.end ? new Date(issueDetail.deadline.end) : null;
    setSelectedDate([s, e]);

    // 3) 담당자 ids
    if ((issueDetail.managers?.cnt ?? 0) > 0) {
      const managerNames = issueDetail.managers?.info?.map((m) => m.name) ?? [];
      const ids = managerNames
        .map((n) => nameToId[n])
        .filter((v): v is number => typeof v === 'number');
      setManagersId(ids);
    } else {
      setManagersId([]);
    }

    // 4) 목표 goalId (단일)
    //    - 우선 응답에 id가 있으면 그걸 사용
    //    - 없고 title만 있으면 simpleGoals에서 title로 찾아 id 매핑
    //    - 둘 다 없으면 null
    if (issueDetail.goal?.id != null) {
      setGoalId(issueDetail.goal.id);
    } else if (issueDetail.goal?.title) {
      const map = new Map((simpleGoals ?? []).map((g) => [g.title, g.id] as const));
      const mapped = map.get(issueDetail.goal.title);
      setGoalId(typeof mapped === 'number' ? mapped : null);
    } else {
      setGoalId(null);
    }

    // 5) 에디터 역직렬화
    editorRef.current?.loadJson?.(issueDetail.content ?? '');

    hydratedRef.current = true;
  }, [
    issueDetail,
    issueId,
    editorRef,
    workspaceMembers,
    simpleGoals,
    nameToId,
    setTitle,
    setState,
    setPriority,
    setSelectedDate,
    setManagersId,
    setGoalId,
  ]);
};
