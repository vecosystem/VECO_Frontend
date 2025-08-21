/**
 * @todo
 * - 실제 external.ts 데이터 구조에 맞게 리팩토링
 */
import { useEffect, useRef } from 'react';
import type { SubmitHandleRef } from '../components/DetailView/TextEditor/lexical-plugins/SubmitHandlePlugin';
import {
  type StatusCode,
  type PriorityCode,
  type ExternalCode,
  EXTERNAL_CODES,
} from '../types/listItem';
import type { SimpleGoal } from '../types/goal';
import type { ViewExternalDetailDto } from '../types/external';

type Params = {
  externalDetail?: ViewExternalDetailDto | undefined;
  externalId?: number;
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
  setExtServiceType: (v: ExternalCode | null) => void;
};

const isExternalCode = (v: unknown): v is ExternalCode =>
  typeof v === 'string' && (EXTERNAL_CODES as readonly string[]).includes(v as string);

export const useHydrateExternalDetail = ({
  externalDetail,
  externalId,
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
  setExtServiceType,
}: Params) => {
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (!externalDetail) return;
    if (!Number.isFinite(externalId)) return;
    if (hydratedRef.current) return;

    // 옵션 준비여부 판단
    // - 담당자가 존재하면 멤버 옵션 준비 필요
    const membersReady =
      (workspaceMembers?.length ?? 0) > 0 || (externalDetail.managers?.cnt ?? 0) === 0;

    // - 목표 연결(단일) 세팅용: 서버 응답에 goal.id가 있으면 바로 세팅 가능
    //   goal.id가 없고 title만 있을 경우, simpleGoals 준비 후 title->id 매핑 필요
    const needGoalsByTitle = !!externalDetail.goalTitle && externalDetail.goalId == null;
    const goalsReady = needGoalsByTitle ? (simpleGoals?.length ?? 0) > 0 : true;

    if (!membersReady || !goalsReady) return;

    // 1) 기본 필드
    setTitle(externalDetail.title ?? '');
    setState((externalDetail.state ?? 'NONE') as StatusCode);
    setPriority((externalDetail.priority ?? 'NONE') as PriorityCode);
    setExtServiceType(
      isExternalCode(externalDetail.extServiceType) ? externalDetail.extServiceType : null
    );

    // 2) 기한
    const s = externalDetail.deadline?.start ? new Date(externalDetail.deadline.start) : null;
    const e = externalDetail.deadline?.end ? new Date(externalDetail.deadline.end) : null;
    setSelectedDate([s, e]);

    // 3) 담당자 ids
    if ((externalDetail.managers?.cnt ?? 0) > 0) {
      const managerNames = externalDetail.managers?.info?.map((m) => m.name) ?? [];
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
    if (externalDetail.goalId != null && typeof (externalDetail.goalId as any).id === 'number') {
      setGoalId(Number((externalDetail.goalId as any).id));
    } else if (typeof (externalDetail as any).goalId === 'number') {
      setGoalId(Number((externalDetail as any).goalId));
    } else if (externalDetail.goalTitle) {
      const map = new Map((simpleGoals ?? []).map((g) => [g.title, g.id] as const));
      const mapped = map.get(
        String((externalDetail.goalTitle as any).title ?? externalDetail.goalTitle)
      );
      setGoalId(typeof mapped === 'number' ? mapped : null);
    } else {
      setGoalId(null);
    }

    // 5) 에디터 역직렬화
    editorRef.current?.loadJson?.(externalDetail.content ?? '');

    hydratedRef.current = true;
  }, [
    externalDetail,
    externalId,
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
    setExtServiceType,
  ]);
};
