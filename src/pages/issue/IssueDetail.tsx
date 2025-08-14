// IssueDetail.tsx
// 이슈 상세페이지

import { useState, useRef } from 'react';
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

import { getStatusColor } from '../../utils/listItemUtils';
import { statusLabelToCode } from '../../types/detailitem';
import CommentSection from '../../components/DetailView/Comment/CommentSection';
import CalendarDropdown from '../../components/Calendar/CalendarDropdown';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import { formatDateDot } from '../../utils/formatDate';
import { useToggleMode } from '../../hooks/useToggleMode';

import CommentInput from '../../components/DetailView/Comment/CommentInput';
import { usePostComment } from '../../apis/comment/usePostComment';
import MultiSelectPropertyItem from '../../components/DetailView/MultiSelectPropertyItem';
import type { SubmitHandleRef } from '../../components/DetailView/TextEditor/lexical-plugins/SubmitHandlePlugin';
import { useCreateGoal } from '../../apis/goal/usePostCreateGoalDetail';
import { useIsMutating } from '@tanstack/react-query';
import { mutationKey } from '../../constants/mutationKey';
import { useParams } from 'react-router-dom';

/** 상세페이지 모드 구분
 * (1) create - 생성 모드: 처음에 생성하여 작성 완료하기 전
 * (2) view - 조회 모드: 작성 완료 후 조회할 때
 * (3) edit - 수정 모드: 작성 완료 후 다시 수정할 때
 */
interface IssueDetailProps {
  initialMode: 'create' | 'view' | 'edit';
}

const IssueDetail = ({ initialMode }: IssueDetailProps) => {
  const [mode, setMode] = useState<'create' | 'view' | 'edit'>(initialMode); // 상세페이지 모드 상태
  const [selectedDate, setSelectedDate] = useState<[Date | null, Date | null]>([null, null]); // '기한' 속성의 달력 드롭다운: 시작일, 종료일 2개를 저장

  const [title, setTitle] = useState('');

  const editorSubmitRef = useRef<SubmitHandleRef | null>(null); // 텍스트에디터 컨텐츠 접근용 플래그
  const isSubmittingRequestRef = useRef(false); // API 제출 중복 요청 가드 플래그
  const teamId = Number(useParams<{ teamId: string }>().teamId);
  /**
   * @todo: 나중에 useCreateIssue로 제대로 연결
   */
  const { mutate: submitGoal, isPending } = useCreateGoal(teamId);
  const isCreatingGlobal = useIsMutating({ mutationKey: [mutationKey.ISSUE_CREATE, teamId] }) > 0;
  const isSaving = isPending || isCreatingGlobal || isSubmittingRequestRef.current;

  const { isOpen, content } = useDropdownInfo(); // 작성 완료 여부 (view 모드일 때 true)
  const { openDropdown } = useDropdownActions(); // 수정 가능 여부 (create 또는 edit 모드일 때 true)

  const isCompleted = mode === 'view'; // 작성 완료 여부 (view 모드일 때 true)
  const isEditable = mode === 'create' || mode === 'edit'; // 수정 가능 여부 (create 또는 edit 모드일 때 true)

  // issueId를 useParams로부터 가져옴
  const { issueId } = useParams<{ issueId: string }>();

  const handleToggleMode = useToggleMode({
    mode,
    setMode,
    type: 'issue',
    id: Number(issueId),
    isDefaultTeam: false,
  });

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

  // '담당자' 속성 아이콘 매핑 (나중에 API로부터 받아온 데이터로 대체 예정)
  const managerIconMap = {
    담당자: IcProfile,
    없음: IcProfile,
    전채운: IcProfile,
    염주원: IcProfile,
    박유민: IcProfile,
    이가을: IcProfile,
    김선화: IcProfile,
    박진주: IcProfile,
  };

  const goalIconMap = {
    목표: IcGoal,
    없음: IcGoal,
    '백호를 사용해서 다른 사람들과 협업해보기': IcGoal,
    '기획 및 요구사항 분석': IcGoal,
  };

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
      <DetailHeader type={'issue'} defaultTitle="이슈를 생성하세요" title={title} />

      {/* 상세페이지 메인 */}
      <div className="flex px-[3.2rem] gap-[8.8rem] w-full min-h-max">
        {/* 상세페이지 좌측 영역 - 제목 & 상세설명 & 댓글 */}
        <div className="flex flex-col flex-1 gap-[3.2rem] w-[calc(100%-33rem)] min-h-max">
          {/* 상세페이지 제목 */}
          <DetailTitle
            defaultTitle="이슈를 생성하세요"
            title={title}
            setTitle={setTitle}
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
            <div className="w-full font-title-sub-r tex-gray-600">속성</div>
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
                />
              </div>

              {/* (2) 우선순위 */}
              <div onClick={(e) => e.stopPropagation()}>
                <PropertyItem
                  defaultValue="우선순위"
                  options={['없음', '긴급', '높음', '중간', '낮음']}
                  iconMap={priorityIconMap}
                />
              </div>

              {/* (3) 담당자 */}
              <div onClick={(e) => e.stopPropagation()}>
                <MultiSelectPropertyItem
                  defaultValue="담당자"
                  options={['없음', '전채운', '염주원', '박유민', '이가을', '김선화', '박진주']}
                  iconMap={managerIconMap}
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
                      onSelect={(date) => setSelectedDate(date)}
                    />
                  )}
                </div>
              </div>

              {/* (5) 목표 */}
              <div onClick={(e) => e.stopPropagation()}>
                <PropertyItem
                  defaultValue="목표"
                  options={[
                    '없음',
                    '백호를 사용해서 다른 사람들과 협업해보기',
                    '기획 및 요구사항 분석',
                  ]}
                  iconMap={goalIconMap}
                />
              </div>
            </div>
          </div>

          {/* 작성 완료 버튼 */}
          <CompletionButton
            isTitleFilled={title.trim().length > 0}
            isCompleted={isCompleted}
            isSaving={isSaving}
            onToggle={handleToggleMode}
          />
        </div>
      </div>
      <div ref={bottomRef} className="scroll-mb-[6.4rem]" />
    </div>
  );
};

export default IssueDetail;
