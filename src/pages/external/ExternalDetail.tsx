// ExternalDetail.tsx
// 외부 상세페이지

import { useState, useRef, useMemo, startTransition } from 'react';
import DetailHeader from '../../components/DetailView/DetailHeader';
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
import IcGoal from '../../assets/icons/goal.svg';
import IcExt from '../../assets/icons/external.svg';

import { getStatusColor } from '../../utils/listItemUtils';
import { priorityLabelToCode, statusLabelToCode } from '../../types/detailitem';
import CommentSection from '../../components/DetailView/Comment/CommentSection';
import CalendarDropdown from '../../components/Calendar/CalendarDropdown';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import { formatDateDot, formatDateHyphen } from '../../utils/formatDate';
import { useToggleMode } from '../../hooks/useToggleMode';
import { useParams } from 'react-router-dom';
import { useGetExternalLinks } from '../../apis/external/useGetExternalLinks.ts';

import CommentInput from '../../components/DetailView/Comment/CommentInput';
import { usePostComment } from '../../apis/comment/usePostComment';
import MultiSelectPropertyItem from '../../components/DetailView/MultiSelectPropertyItem.tsx';
import {
  EMPTY_EDITOR_STATE,
  type SubmitHandleRef,
} from '../../components/DetailView/TextEditor/lexical-plugins/SubmitHandlePlugin.tsx';
import { useIsMutating } from '@tanstack/react-query';
import { mutationKey } from '../../constants/mutationKey.ts';
import {
  EXTERNAL_LABELS,
  PRIORITY_LABELS,
  STATUS_LABELS,
  LABEL_TO_EXTERNAL_CODE,
  type ExternalCode,
  type PriorityCode,
  type StatusCode,
} from '../../types/listItem.ts';
import { useGetWorkspaceMembers } from '../../apis/setting/useGetWorkspaceMembers.ts';
import { useGetSimpleGoalList } from '../../apis/goal/useGetSimpleGoalList.ts';
import { useCreateExternal } from '../../apis/external/usePostCreateExternalDetail.ts';
import { useGetExternalDetail } from '../../apis/external/useGetExternalDetail.ts';
import { useUpdateExternal } from '../../apis/external/usePatchExternalDetail.ts';
import { useExternalDeadlinePatch } from '../../hooks/useExternalDeadlinePatch.ts';
import type { CreateExternalDetailDto, UpdateExternalDetailDto } from '../../types/external.ts';
import queryClient from '../../utils/queryClient.ts';
import { queryKey } from '../../constants/queryKey.ts';
import { useHydrateExternalDetail } from '../../hooks/useHydrateExternalDetail.ts';
import {
  getGithubRepository,
  useGetGithubRepository,
} from '../../apis/external/useGetGithubRepository.ts';
import {
  getGithubInstallationId,
  useGetGithubInstallationId,
} from '../../apis/external/useGetGithubInstallationId.ts';
import { useToast } from '../../components/Toast/ToastProvider.tsx';

/** 상세페이지 모드 구분
 * (1) create - 생성 모드: 처음에 생성하여 작성 완료하기 전
 * (2) view - 조회 모드: 작성 완료 후 조회할 때
 * (3) edit - 수정 모드: 작성 완료 후 다시 수정할 때
 */
interface ExternalDetailProps {
  initialMode: 'create' | 'view' | 'edit';
}

const ExternalDetail = ({ initialMode }: ExternalDetailProps) => {
  const [mode, setMode] = useState<'create' | 'view' | 'edit'>(initialMode); // 상세페이지 모드 상태
  const [selectedDate, setSelectedDate] = useState<[Date | null, Date | null]>([null, null]); // '기한' 속성의 달력 드롭다운: 시작일, 종료일 2개를 저장

  const [title, setTitle] = useState('');
  const [state, setState] = useState<StatusCode>('NONE');
  const [priority, setPriority] = useState<PriorityCode>('NONE');
  const [managersId, setManagersId] = useState<number[]>([]);
  const [extServiceType, setExtServiceType] = useState<ExternalCode | null>(null);

  const [goalId, setGoalId] = useState<number | null>(null); // null 허용

  const editorSubmitRef = useRef<SubmitHandleRef | null>(null); // 텍스트에디터 컨텐츠 접근용 플래그
  const isSubmittingRequestRef = useRef(false); // API 제출 중복 요청 가드 플래그
  const teamId = Number(useParams<{ teamId: string }>().teamId);

  // extId를 useParams로부터 가져옴
  const { extId: extIdParam } = useParams<{ extId: string }>();
  const numericExternalId = Number(extIdParam);

  const { data: workspaceMembers } = useGetWorkspaceMembers();
  const { data: simpleGoals } = useGetSimpleGoalList(teamId); // 팀 목표 간단 조회 (select로 info만 나오도록 되어 있음)
  const { mutate: submitExternal, isPending: isCreating } = useCreateExternal(teamId);
  const { data: externalDetail } = useGetExternalDetail(teamId, numericExternalId, {
    enabled: true,
  });
  const { mutate: updateExternal, isPending: isUpdating } = useUpdateExternal(
    teamId,
    numericExternalId
  );
  const needGithubMeta = extServiceType === 'GITHUB';
  const { data: githubRepo, isLoading: repoLoading } = useGetGithubRepository(teamId, {
    enabled: needGithubMeta,
  });
  const { data: githubInstall, isLoading: installLoading } = useGetGithubInstallationId(teamId, {
    enabled: needGithubMeta,
  });

  const isCreatingGlobal =
    useIsMutating({ mutationKey: [mutationKey.EXTERNAL_CREATE, teamId] }) > 0;
  const isSaving = isCreating || isUpdating || isCreatingGlobal || isSubmittingRequestRef.current;

  const { isOpen, content } = useDropdownInfo(); // 작성 완료 여부 (view 모드일 때 true)
  const { openDropdown } = useDropdownActions(); // 수정 가능 여부 (create 또는 edit 모드일 때 true)
  const { showToast } = useToast(); // 우측 하단 토스트
  const canChangeExternal = mode === 'create'; // 외부 항목 편집 가능 여부 (create 모드일 때만 가능)

  const isCompleted = mode === 'view'; // 작성 완료 여부 (view 모드일 때 true)
  const isEditable = mode === 'create' || mode === 'edit'; // 수정 가능 여부 (create 또는 edit 모드일 때 true)
  const canPatch = Number.isFinite(numericExternalId); // PATCH 가능 조건

  const repoObj = useMemo(
    () => (Array.isArray(githubRepo) ? githubRepo[0] : githubRepo),
    [githubRepo]
  );

  // 깃허브 연동 외부이슈일 경우 POST 요청시 필요한 owner, repo, installationId 데이터
  const githubPayload = useMemo(() => {
    const owner = repoObj?.owner?.login;
    const repo = repoObj?.name;
    const installationId = githubInstall?.installationId;
    return { owner, repo, installationId };
  }, [repoObj, githubInstall]);

  const isGithubLoading = needGithubMeta && (repoLoading || installLoading);
  const isGithubReady =
    !needGithubMeta ||
    (!!githubPayload.owner && !!githubPayload.repo && !!githubPayload.installationId);

  const { data: linkedTools } = useGetExternalLinks(teamId);
  const linkedToolsList = linkedTools
    ? [
        ...(linkedTools.linkedWithGithub ? [EXTERNAL_LABELS.GITHUB] : []),
        ...(linkedTools.linkedWithSlack ? [EXTERNAL_LABELS.SLACK] : []),
      ]
    : [];

  // 단일 선택 라벨
  const selectedStatusLabel = STATUS_LABELS[state];
  const selectedPriorityLabel = PRIORITY_LABELS[priority];
  const selectedExternalLabel = extServiceType ? EXTERNAL_LABELS[extServiceType] : '외부';

  const selectedGoalLabel = useMemo(() => {
    const match = (simpleGoals ?? []).find((g) => g.id === goalId);
    return match?.title ?? '목표'; // 데이터 없거나 매칭 실패 시 기본 라벨
  }, [simpleGoals, goalId]);

  // 다중 선택 라벨
  const selectedManagerLabels = useMemo(() => {
    if (!workspaceMembers) return [];
    const idToName = new Map(workspaceMembers.map((m) => [m.memberId, m.name] as const));
    return managersId.map((id) => idToName.get(id)).filter((v): v is string => !!v);
  }, [managersId, workspaceMembers]);
  const [managersShowNoneLabel] = useState(false);

  // deadline('기한' 속성) patch 훅
  const { handleSelectDateAndPatch, buildPatchForEditSubmit } = useExternalDeadlinePatch({
    externalDetail,
    isViewMode: isCompleted,
    canPatch,
    mutateUpdate: updateExternal,
  });

  const handleToggleMode = useToggleMode({
    mode,
    setMode,
    type: 'ext',
    id: Number(extIdParam),
    isDefaultTeam: false,
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
      ...(goalId !== null && goalId !== undefined && goalId !== -1 ? { goalId } : {}),
      ...(extServiceType ? { extServiceType } : {}),
    };

    console.log('Request body:', basePayload);

    if (mode === 'create') {
      // 1) 외부 툴 선택이 안 되었을 때
      if (!extServiceType) {
        isSubmittingRequestRef.current = false;
        showToast({
          contents: '반드시 외부 툴을 설정해야 합니다.',
          key: 'extRequired', // 중복 합치기
        });
        return; // 생성 중단
      }

      // 2) GitHub 선택 시 필수값 검증
      if (extServiceType === 'GITHUB') {
        if (repoLoading || installLoading) {
          isSubmittingRequestRef.current = false;
          showToast({ contents: 'GitHub 정보를 불러오는 중입니다.', key: 'githubLoading' });
          return;
        }
        // 3) 값이 준비되지 않았으면 중단
        if (!isGithubReady) {
          isSubmittingRequestRef.current = false;
          console.error('GitHub 연동 누락:', githubPayload);
          showToast({
            contents: 'GitHub 연동 정보가 부족합니다. 설치/온보딩을 먼저 완료해 주세요.',
            key: 'githubMissing',
          });
          return;
        }
        const { owner, repo, installationId } = githubPayload;
        if (!owner || !repo || !installationId) {
          isSubmittingRequestRef.current = false;
          console.error('GitHub 연동 누락: owner/repo/installationId 필요', {
            owner,
            repo,
            installationId,
          });
          showToast({
            contents: 'GitHub 연동 정보가 부족합니다. 설치/온보딩을 먼저 완료해 주세요.',
            key: 'githubMissing',
          });
          return;
        }
      }

      // 생성 시에는 기존 로직 유지 (규칙 제약 없음)
      const payload: CreateExternalDetailDto = {
        ...basePayload,
        // GitHub일 때만 추가
        ...(extServiceType === 'GITHUB'
          ? {
              owner: githubPayload.owner!,
              repo: githubPayload.repo!,
              installationId: githubPayload.installationId!,
            }
          : {}),
        deadline: {
          ...(start ? { start: formatDateHyphen(start) } : {}),
          ...(end ? { end: formatDateHyphen(end) } : {}),
        },
      };

      submitExternal(payload, {
        onSuccess: ({ externalId }) => {
          queryClient.invalidateQueries({ queryKey: [queryKey.EXTERNAL_LIST, String(teamId)] });
          queryClient.invalidateQueries({ queryKey: [queryKey.EXTERNAL_NAME, String(teamId)] });
          startTransition(() => handleToggleMode(externalId));
        },
        onSettled: () => {
          isSubmittingRequestRef.current = false;
        },
      });
    } else if (mode === 'edit') {
      const patch = buildPatchForEditSubmit(selectedDate);
      const { extServiceType: _omit, ...rest } = basePayload;
      const payload = { ...rest, ...(patch ?? {}) } as UpdateExternalDetailDto;

      // 수정 시 goalId가 없으면 생략된 상태로 보냄
      if (goalId === null || goalId === undefined || goalId === -1) {
        delete (payload as any).goalId; // goalId가 null, undefined, -1이면 삭제
      }

      updateExternal(payload, {
        onSuccess: () => {
          if (Number.isFinite(numericExternalId)) {
            queryClient.invalidateQueries({ queryKey: [queryKey.EXTERNAL_LIST, String(teamId)] });
            queryClient.invalidateQueries({ queryKey: [queryKey.EXTERNAL_NAME, String(teamId)] });
            queryClient.invalidateQueries({
              queryKey: [queryKey.EXTERNAL_DETAIL, numericExternalId],
            });
          }
          startTransition(() => handleToggleMode());
        },
        onSettled: () => (isSubmittingRequestRef.current = false),
      });
    }
  };

  // handleCompletion - 하단 작성 완료<->수정하기 버튼 클릭 시 실행
  // - create/edit -> view: API 저장 후 모드 전환
  // - view -> edit: API 호출 없이 모드 전환
  const handleCompletion = () => {
    if (!isCompleted) {
      // create 또는 edit 모드에서 view 모드로 전환하려는 시점
      if (mode === 'create' && !extServiceType) {
        showToast({ contents: '반드시 외부 툴을 설정해야 합니다.', key: 'extRequired' });
        return;
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

  const goalOptions = useMemo(
    () => ['없음', ...(simpleGoals ?? []).map((g) => g.title)],
    [simpleGoals]
  );

  const goalIconMap = new Proxy(
    {},
    {
      get: () => IcGoal,
    }
  ) as Record<string, string>;

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
      base[m.name] = m.profileImageUrl || IcProfile;
    }
    return base;
  }, [teamMembers]);

  // title -> id 역매핑
  const goalTitleToId = useMemo(() => {
    const info = simpleGoals ?? [];
    return new Map(info.map((g) => [g.title, g.id] as const));
  }, [simpleGoals]);

  // 외부 툴 아이콘 매핑
  const externalIconMap = {
    외부: IcExt,
    Slack: IcExt,
    GitHub: IcExt,
  };

  useHydrateExternalDetail({
    externalDetail,
    externalId: numericExternalId,
    editorRef: editorSubmitRef,
    workspaceMembers,
    simpleGoals, // 단일 목표 라벨/매핑용 간단 목록
    nameToId, // 멤버 이름 -> id 매핑
    setTitle,
    setState,
    setPriority,
    setSelectedDate,
    setManagersId,
    setGoalId,
    setExtServiceType,
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
      <DetailHeader type={'external'} defaultTitle="제목을 작성해보세요" title={title} />

      {/* 상세페이지 메인 */}
      <div className="flex px-[3.2rem] gap-[8.8rem] w-full min-h-max">
        {/* 상세페이지 좌측 영역 - 제목 & 상세설명 & 댓글 */}
        <div className="flex flex-col flex-1 gap-[3.2rem] w-[calc(100%-33rem)] min-h-max">
          {/* 상세페이지 제목 */}
          <DetailTitle
            defaultTitle="제목을 작성해보세요"
            title={title}
            setTitle={(v) => {
              setTitle(v);
              // view 모드에서 즉시 PATCH
              if (isCompleted && Number.isFinite(numericExternalId)) {
                updateExternal({ title: v });
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
                    if (isCompleted && Number.isFinite(numericExternalId)) {
                      updateExternal({ state: next });
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
                    if (isCompleted && Number.isFinite(numericExternalId)) {
                      updateExternal({ priority: next });
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
                      if (isCompleted && Number.isFinite(numericExternalId)) {
                        updateExternal({ managersId: [] });
                      }
                      return;
                    }

                    // 2) '없음'이 다른 값과 섞여 오면 제거
                    const cleaned = labels.filter((l) => l !== '없음');

                    const ids = cleaned
                      .map((label) => nameToId[label])
                      .filter((v): v is number => typeof v === 'number');

                    setManagersId(ids);
                    if (isCompleted && Number.isFinite(numericExternalId)) {
                      updateExternal({ managersId: ids });
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

              {/* (5) 목표 */}
              <div onClick={(e) => e.stopPropagation()}>
                <PropertyItem
                  defaultValue="목표"
                  options={goalOptions}
                  iconMap={goalIconMap} // 어떤 옵션이든 IcGoal
                  selected={selectedGoalLabel} // ← 현재 선택 라벨
                  onSelect={(label) => {
                    // '없음' 대응 (백엔드가 null 허용 전이라면 0으로)
                    if (label === '없음') {
                      setGoalId(null);
                      if (isCompleted && Number.isFinite(numericExternalId)) {
                      }
                      return;
                    }

                    // title -> id 매핑
                    const id = goalTitleToId.get(label);
                    if (typeof id === 'number') {
                      setGoalId(id);
                      if (isCompleted && Number.isFinite(numericExternalId)) {
                        updateExternal({ goalId: id });
                      }
                    }
                  }}
                />
              </div>

              {/* (6) 외부 */}
              <div onClick={(e) => e.stopPropagation()} className="relative">
                <PropertyItem
                  defaultValue="외부"
                  options={linkedToolsList}
                  iconMap={externalIconMap}
                  selected={selectedExternalLabel}
                  onSelect={(label) => {
                    if (!canChangeExternal) return; // 가드
                    const code = LABEL_TO_EXTERNAL_CODE[label];
                    setExtServiceType(code ?? null);
                    if (code === 'GITHUB') {
                      queryClient.prefetchQuery({
                        queryKey: [queryKey.GITHUB_REPOSITORIES, teamId],
                        queryFn: () => getGithubRepository(teamId),
                      });
                      queryClient.prefetchQuery({
                        queryKey: [queryKey.GITHUB_INSTALLATION_ID, teamId],
                        queryFn: () => getGithubInstallationId(teamId),
                      });
                    }
                  }}
                />

                {/* view / edit 모드에서는 클릭 완전 차단 */}
                {!canChangeExternal && (
                  <div
                    className="absolute inset-0 z-10"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      showToast({
                        contents: '외부 툴은 생성 시 한 번만 설정 가능합니다.',
                        key: 'extLocked',
                      });
                    }}
                    role="button"
                    aria-label="외부 툴은 생성 시 한 번만 설정 가능합니다."
                  />
                )}
              </div>
            </div>
          </div>

          {/* 작성 완료 버튼 */}
          <CompletionButton
            isTitleFilled={title.trim().length > 0}
            isCompleted={isCompleted}
            isSaving={isSaving || isGithubLoading}
            onToggle={handleCompletion}
          />
        </div>
      </div>
      <div ref={bottomRef} className="scroll-mb-[6.4rem]" />
    </div>
  );
};

export default ExternalDetail;
