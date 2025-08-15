// WorkspaceGoalDetail.tsx
// 워크스페이스 전체 팀 - 목표 상세페이지

import { useState, useRef, useMemo, startTransition } from 'react';
import WorkspaceDetailHeader from '../../components/DetailView/WorkspaceDetailHeader';
import PropertyItem from '../../components/DetailView/PropertyItem';
import DetailTitle from '../../components/DetailView/DetailTitle';
import CompletionButton from '../../components/DetailView/CompletionButton';
import DetailTextEditor from '../../components/DetailView/TextEditor/DetailTextEditor';

// 속성 항목별 아이콘 svg import
import pr0 from '../../assets/icons/pr-0-sm.svg';
import pr1 from '../../assets/icons/pr-1-sm.svg';
import pr2 from '../../assets/icons/pr-2-sm.svg';
import pr3 from '../../assets/icons/pr-3-sm.svg';
import pr4 from '../../assets/icons/pr-4-sm.svg';
import IcProfile from '../../assets/icons/user-base.svg';
import IcCalendar from '../../assets/icons/date-lg.svg';

import { getStatusColor } from '../../utils/listItemUtils';
import { priorityLabelToCode, statusLabelToCode } from '../../types/detailitem';
import CommentSection from '../../components/DetailView/Comment/CommentSection';
import CalendarDropdown from '../../components/Calendar/CalendarDropdown';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import { formatDateDot, formatDateHyphen } from '../../utils/formatDate';
import { useToggleMode } from '../../hooks/useToggleMode';

import CommentInput from '../../components/DetailView/Comment/CommentInput';
import { usePostComment } from '../../apis/comment/usePostComment';
import MultiSelectPropertyItem from '../../components/DetailView/MultiSelectPropertyItem';
import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  type PriorityCode,
  type StatusCode,
} from '../../types/listItem';
import {
  EMPTY_EDITOR_STATE,
  type SubmitHandleRef,
} from '../../components/DetailView/TextEditor/lexical-plugins/SubmitHandlePlugin';
import { useParams } from 'react-router-dom';
import { useGetWorkspaceMembers } from '../../apis/setting/useGetWorkspaceMembers';
import { useGetSimpleIssueList } from '../../apis/issue/useGetSimpleIssueList';
import { useCreateGoal } from '../../apis/goal/usePostCreateGoalDetail';
import { useIsMutating, useQueryClient } from '@tanstack/react-query';
import { mutationKey } from '../../constants/mutationKey';
import type { CreateGoalDetailDto, UpdateGoalDetailDto } from '../../types/goal';
import { useGetGoalDetail } from '../../apis/goal/useGetGoalDetail';
import { useHydrateGoalDetail } from '../../hooks/useHydrateGoalDetail';
import { useUpdateGoal } from '../../apis/goal/usePatchGoalDetail';
import { useGoalDeadlinePatch } from '../../hooks/useGoalDeadlinePatch';

/** 상세페이지 모드 구분
 * (1) create - 생성 모드: 처음에 생성하여 작성 완료하기 전
 * (2) view - 조회 모드: 작성 완료 후 조회할 때
 * (3) edit - 수정 모드: 작성 완료 후 다시 수정할 때
 */
interface WorkspaceGoalDetailProps {
  initialMode: 'create' | 'view' | 'edit';
}

const WorkspaceGoalDetail = ({ initialMode }: WorkspaceGoalDetailProps) => {
  const [mode, setMode] = useState<'create' | 'view' | 'edit'>(initialMode); // 상세페이지 모드 상태
  const [selectedDate, setSelectedDate] = useState<[Date | null, Date | null]>([null, null]); // '기한' 속성의 달력 드롭다운: 시작일, 종료일 2개를 저장

  const [title, setTitle] = useState('');
  const [state, setState] = useState<StatusCode>('NONE');
  const [priority, setPriority] = useState<PriorityCode>('NONE');
  const [managersId, setManagersId] = useState<number[]>([]);
  const [issuesId, setIssuesId] = useState<number[]>([]);

  const editorSubmitRef = useRef<SubmitHandleRef | null>(null); // 텍스트에디터 컨텐츠 접근용 플래그
  const isSubmittingRequestRef = useRef(false); // API 제출 중복 요청 가드 플래그
  const teamId = Number(useParams<{ teamId: string }>().teamId);

  // goalId를 useParams로부터 가져옴
  const { goalId: goalIdParam } = useParams<{ goalId: string }>();
  const numericGoalId = Number(goalIdParam);

  const { data: workspaceMembers } = useGetWorkspaceMembers();
  const { data: simpleIssues } = useGetSimpleIssueList(teamId); // 팀 이슈 간단 조회 (select로 info만 나오도록 되어 있음)
  const { mutate: submitGoal, isPending: isCreating } = useCreateGoal(teamId);
  const { data: goalDetail } = useGetGoalDetail(numericGoalId);
  const { mutate: updateGoal, isPending: isUpdating } = useUpdateGoal(teamId, numericGoalId);

  const isCreatingGlobal = useIsMutating({ mutationKey: [mutationKey.GOAL_CREATE, teamId] }) > 0;
  const isSaving = isCreating || isUpdating || isCreatingGlobal || isSubmittingRequestRef.current;

  const { isOpen, content } = useDropdownInfo(); // 현재 드롭다운의 열림 여부와 내용 가져옴
  const { openDropdown } = useDropdownActions();

  const isCompleted = mode === 'view'; // 작성 완료 여부 (view 모드일 때 true)
  const isEditable = mode === 'create' || mode === 'edit'; // 수정 가능 여부 (create 또는 edit 모드일 때 true)
  const canPatch = Number.isFinite(numericGoalId); // PATCH 가능 조건

  // 상세 조회 훅: goalId가 있을 때만 자동 실행됨
  const queryClient = useQueryClient();

  // 단일 선택 라벨
  const selectedStatusLabel = STATUS_LABELS[state];
  const selectedPriorityLabel = PRIORITY_LABELS[priority];

  // 다중 선택 라벨
  const selectedManagerLabels = useMemo(() => {
    if (!workspaceMembers) return [];
    const idToName = new Map(workspaceMembers.map((m) => [m.memberId, m.name] as const));
    return managersId.map((id) => idToName.get(id)).filter((v): v is string => !!v);
  }, [managersId, workspaceMembers]);

  const selectedIssueLabels = useMemo(() => {
    const idToTitle = new Map((simpleIssues ?? []).map((i) => [i.id, i.title] as const));
    return issuesId.map((id) => idToTitle.get(id)).filter((v): v is string => !!v);
  }, [issuesId, simpleIssues]);
  const [managersShowNoneLabel] = useState(false);
  const [issuesShowNoneLabel, setIssuesShowNoneLabel] = useState(false);

  // deadline('기한' 속성) patch 훅
  const { handleSelectDateAndPatch, buildPatchForEditSubmit } = useGoalDeadlinePatch({
    goalDetail,
    isViewMode: isCompleted,
    canPatch,
    mutateUpdate: updateGoal,
  });

  // handleToggleMode: 상세페이지 모드 전환
  const handleToggleMode = useToggleMode({
    mode,
    setMode,
    type: 'goal',
    id: Number(goalIdParam),
    isDefaultTeam: true,
  });

  // handleSubmit: Lexical 에디터 내용을 JSON 문자열로 직렬화 후 API로 전송하는 함수
  const handleSubmit = () => {
    if (editorSubmitRef.current) {
      // ref를 통해 직렬화된 에디터 내용 가져오기
      const serialized = editorSubmitRef.current?.getJson() ?? '';
      const byteLength = new TextEncoder().encode(serialized).length;
      console.log('Serialized JSON byte length:', byteLength);
    }

    if (isSaving) return;
    isSubmittingRequestRef.current = true;

    const [start, end] = selectedDate;

    // 화면 상태를 공통 페이로드로 구성
    const basePayload = {
      title,
      content: editorSubmitRef.current?.getJson() ?? EMPTY_EDITOR_STATE,
      state,
      priority,
      managersId,
      issuesId,
    };
    if (mode === 'create') {
      // 생성 시에는 기존 로직 유지 (규칙 제약 없음)
      const payload: CreateGoalDetailDto = {
        ...basePayload,
        deadline: {
          ...(start ? { start: formatDateHyphen(start) } : {}),
          ...(end ? { end: formatDateHyphen(end) } : {}),
        },
      };

      submitGoal(payload, {
        onSuccess: ({ goalId }) => {
          queryClient.invalidateQueries({ queryKey: ['GOAL_DETAIL', goalId] });
          startTransition(() => handleToggleMode(goalId));
        },
        onSettled: () => {
          isSubmittingRequestRef.current = false;
        },
      });
    } else if (mode === 'edit') {
      const patch = buildPatchForEditSubmit(selectedDate);
      const payload = { ...basePayload, ...(patch ?? {}) } as UpdateGoalDetailDto;

      updateGoal(payload, {
        onSuccess: () => {
          if (Number.isFinite(numericGoalId)) {
            queryClient.invalidateQueries({ queryKey: ['GOAL_DETAIL', numericGoalId] });
          }
          startTransition(() => handleToggleMode());
        },
        onSettled: () => {
          isSubmittingRequestRef.current = false;
        },
      });
    }
  };

  // handleCompletion - 하단 작성 완료<-수정하기 버튼 클릭 시 실행
  // - create/edit → view: API 저장 후 모드 전환
  // - view → edit: API 호출 없이 모드 전환
  const handleCompletion = () => {
    if (!isCompleted) {
      // create 또는 edit 모드에서 view 모드로 전환하려는 시점
      if (Number.isFinite(numericGoalId)) {
        queryClient.invalidateQueries({ queryKey: ['GOAL_DETAIL', numericGoalId] }); // 동일 goalId에서 view로 들어갈 때도 최신화
      }
      handleSubmit(); // 저장 성공 시 모드 전환
    } else {
      handleToggleMode(); // 모드 전환
    }
  };

  // '기한' 속성의 텍스트(시작일, 종료일) 결정하는 함수
  const getDisplayText = () => {
    const [start, end] = selectedDate;
    if (start && end) return `${formatDateDot(start)} - ${formatDateDot(end)}`; // 시작일과 종료일 둘 다 있을 경우
    if (start || end) return formatDateDot(start ?? end!); // 날짜 하나만 선택된 경우
    return '기한'; // 날짜 선택 안 된 경우: default로 '기한' 글씨가 그대로 보이도록
  };

  // '우선순위' 속성 아이콘 매핑
  const priorityIconMap = {
    우선순위: pr3,
    없음: pr0,
    낮음: pr1,
    중간: pr2,
    높음: pr3,
    긴급: pr4,
  };

  // 해당 teamId에 속한 멤버만 필터
  const teamMembers = useMemo(
    () => (workspaceMembers ?? []).filter((m) => m.teams?.some((t) => t.teamId === teamId)),
    [workspaceMembers, teamId]
  );

  // '담당자' 항목의 옵션: ['없음', ...팀 멤버 이름들]
  const managerOptions = useMemo(() => ['없음', ...teamMembers.map((m) => m.name)], [teamMembers]);

  // 멤버 이름 → 멤버 id 매핑 (선택 결과를 id 배열로 변환용)
  const nameToId = useMemo(
    () => Object.fromEntries(teamMembers.map((m) => [m.name, m.memberId] as const)),
    [teamMembers]
  );

  // '담당자' 아이콘 매핑: 이름 → 프로필 URL(없으면 기본 아이콘), '담당자'/'없음' 기본 아이콘 포함
  const managerIconMap = useMemo<Record<string, string>>(() => {
    const base: Record<string, string> = {
      담당자: IcProfile,
      없음: IcProfile,
    };
    for (const m of teamMembers) {
      base[m.name] = m.profileImageUrl || IcProfile; // null/빈값 fallback
    }
    return base;
  }, [teamMembers]);

  // 이슈 옵션: ['없음', ...팀 이슈 제목들]
  const issueOptions = useMemo(
    () =>
      simpleIssues && simpleIssues.length > 0 ? ['없음', ...simpleIssues.map((i) => i.title)] : [],
    [simpleIssues]
  );

  // 이슈 제목 -> 이슈 id 매핑 (선택 결과를 id 배열로 변환용)
  const issueTitleToId = useMemo(
    () => Object.fromEntries((simpleIssues ?? []).map((i) => [i.title, i.id] as const)),
    [simpleIssues]
  );

  useHydrateGoalDetail({
    goalDetail,
    goalId: numericGoalId,
    editorRef: editorSubmitRef,
    workspaceMembers,
    simpleIssues,
    nameToId,
    setTitle,
    setState,
    setPriority,
    setSelectedDate,
    setManagersId,
    setIssuesId,
  });

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const shouldScrollRef = useRef(false);
  const { mutate: addComment } = usePostComment({ bottomRef, shouldScrollRef, useDoubleRaf: true });

  const handleAddComment = (content: string) => {
    shouldScrollRef.current = true;
    addComment(content);
  };

  return (
    <div className="flex flex-1 flex-col min-h-max gap-[5.7rem] w-full px-[3.2rem] pt-[3.2rem]">
      {/* 상세페이지 헤더 */}
      <WorkspaceDetailHeader type={'goal'} defaultTitle="목표를 생성하세요" title={title} />

      {/* 상세페이지 메인 */}
      <div className="flex px-[3.2rem] gap-[8.8rem] w-full min-h-max">
        {/* 상세페이지 좌측 영역 - 제목 & 상세설명 & 댓글 */}
        <div className="flex flex-col gap-[3.2rem] w-[calc(100%-33rem)] min-h-max">
          {/* 상세페이지 제목 */}
          <DetailTitle
            defaultTitle="목표를 생성하세요"
            title={title}
            setTitle={(v) => {
              setTitle(v);
              // view 모드에서 즉시 PATCH
              if (isCompleted && Number.isFinite(numericGoalId)) {
                updateGoal({ title: v });
              }
            }}
            isEditable={isEditable}
          />

          {/* 상세 설명 작성 컴포넌트 */}
          <DetailTextEditor isEditable={isEditable} editorSubmitRef={editorSubmitRef} />
          <div className="flex flex-col min-h-max gap-[1.6rem]">
            {/* 댓글 영역 */}
            {isCompleted && <CommentSection />}
            {/* 댓글 작성 영역 */}
            {isCompleted && (
              <div className="sticky bottom-[0rem] z-20 bg-white">
                <CommentInput onAdd={handleAddComment} />
                <div className="h-[5.3rem] bg-transparent"></div>
              </div>
            )}
          </div>
        </div>

        {/* 상세페이지 우측 영역 - 속성 탭 & 하단의 작성 완료 버튼 */}
        <div className="w-[33rem] flex flex-col min-h-max">
          {/* 속성 탭 */}
          <div className="w-full h-full flex flex-col gap-[1.6rem] ">
            <div className="w-full font-title-sub-r text-gray-600">속성</div>
            <div>
              {/* (1) 상태 */}
              <div onClick={(e) => e.stopPropagation()}>
                <PropertyItem
                  defaultValue="상태"
                  options={['없음', '해야할 일', '진행중', '완료', '검토']}
                  getColor={(label) => {
                    const code = statusLabelToCode[label] ?? 'NONE';
                    return getStatusColor(code);
                  }}
                  onSelect={(label) => {
                    const next = statusLabelToCode[label] ?? 'NONE';
                    setState(next);
                    if (isCompleted && Number.isFinite(numericGoalId)) {
                      updateGoal({ state: next });
                    }
                  }}
                  selected={selectedStatusLabel}
                />
              </div>

              {/* (2) 우선순위 */}
              <div onClick={(e) => e.stopPropagation()}>
                <PropertyItem
                  defaultValue="우선순위"
                  options={['없음', '긴급', '높음', '중간', '낮음']}
                  iconMap={priorityIconMap}
                  onSelect={(label) => {
                    const next = priorityLabelToCode[label] ?? 'NONE';
                    setPriority(next);
                    if (isCompleted && Number.isFinite(numericGoalId)) {
                      updateGoal({ priority: next });
                    }
                  }}
                  selected={selectedPriorityLabel}
                />
              </div>

              {/* (3) 담당자 */}
              <div onClick={(e) => e.stopPropagation()}>
                <MultiSelectPropertyItem
                  defaultValue="담당자"
                  options={managerOptions}
                  iconMap={managerIconMap}
                  onChange={(labels) => {
                    // 1) '없음'만 선택된 경우만 비우기
                    if (labels.length === 1 && labels[0] === '없음') {
                      setManagersId([]);
                      if (isCompleted && Number.isFinite(numericGoalId)) {
                        updateGoal({ managersId: [] });
                      }
                      return;
                    }

                    // 2) '없음'이 다른 값과 섞여 오면 제거
                    const cleaned = labels.filter((l) => l !== '없음');

                    const ids = cleaned
                      .map((label) => nameToId[label])
                      .filter((v): v is number => typeof v === 'number');

                    setManagersId(ids);
                    if (isCompleted && Number.isFinite(numericGoalId)) {
                      updateGoal({ managersId: ids });
                    }
                  }}
                  selected={
                    managersId.length === 0
                      ? managersShowNoneLabel
                        ? ['없음']
                        : [] // 비어있지만 '없음'을 선택했으면 '없음'을 내려줌
                      : selectedManagerLabels
                  }
                />
              </div>

              {/* (4) 기한 */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openDropdown({ name: 'date' });
                }}
                className="flex w-full h-[3.2rem] px-[0.5rem] rounded-md items-center gap-[0.8rem] mb-[1.6rem] whitespace-nowrap hover:bg-gray-200 cursor-pointer"
              >
                {/* '기한' 속성 아이콘 */}
                <img src={IcCalendar} alt="date" />
                <div className="relative">
                  {/* '기한' 항목명 - 날짜 설정하면 반영됨 */}
                  <span className={`font-body-r text-gray-600`}>{getDisplayText()}</span>
                  {/* 달력 드롭다운 오픈 */}
                  {isOpen && content?.name === 'date' && (
                    <CalendarDropdown
                      selectedDate={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        handleSelectDateAndPatch(date); // view 모드 시 즉시 PATCH
                      }}
                    />
                  )}
                </div>
              </div>

              {/* (5) 이슈 */}
              <div onClick={(e) => e.stopPropagation()}>
                <MultiSelectPropertyItem
                  defaultValue="이슈"
                  options={issueOptions}
                  onChange={(labels) => {
                    if (labels.includes('없음')) {
                      setIssuesId([]);
                      if (isCompleted && Number.isFinite(numericGoalId)) {
                        updateGoal({ issuesId: [] });
                      }
                      return;
                    }
                    const ids = labels
                      .map((label) => issueTitleToId[label])
                      .filter((v): v is number => typeof v === 'number');
                    setIssuesId(ids);
                    setIssuesShowNoneLabel(false);
                    if (isCompleted && Number.isFinite(numericGoalId)) {
                      updateGoal({ issuesId: ids });
                    }
                  }}
                  selected={
                    issuesId.length === 0
                      ? issuesShowNoneLabel
                        ? ['없음']
                        : []
                      : selectedIssueLabels
                  }
                />
              </div>
            </div>
          </div>

          {/* 작성 완료 버튼 : 상세페이지 mode 전환을 관리 */}
          <CompletionButton
            isTitleFilled={title.trim().length > 0}
            isCompleted={isCompleted}
            isSaving={isSaving}
            onToggle={handleCompletion}
          />
        </div>
      </div>
      <div ref={bottomRef} className="scroll-mb-[6.4rem]" />
    </div>
  );
};

export default WorkspaceGoalDetail;
