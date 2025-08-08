// WorkspaceIssueDetail.tsx
// 워크스페이스 전체 팀 - 이슈 상세페이지

import { useState } from 'react';
import WorkspaceDetailHeader from '../../components/DetailView/WorkspaceDetailHeader';
import PropertyItem from '../../components/DetailView/PropertyItem';
import DetailTitle from '../../components/DetailView/DetailTitle';
import CompletionButton from '../../components/DetailView/CompletionButton';
import DetailTextEditor from '../../components/DetailView/DetailTextEditor';

// 속성 항목별 아이콘 svg import
import pr1 from '../../assets/icons/pr-1-sm.svg';
import pr2 from '../../assets/icons/pr-2-sm.svg';
import pr3 from '../../assets/icons/pr-3-sm.svg';
import pr4 from '../../assets/icons/pr-4-sm.svg';
import IcProfile from '../../assets/icons/user-circle-sm.svg';
import IcCalendar from '../../assets/icons/date-lg.svg';
import IcGoal from '../../assets/icons/goal.svg';

import { getStatusColor } from '../../utils/listItemUtils';
import { statusLabelToCode } from '../../types/detailitem';
import CommentSection from '../../components/DetailView/Comment/CommentSection';
import CalendarDropdown from '../../components/Calendar/CalendarDropdown';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import { formatDateDot } from '../../utils/formatDate';
import { useToggleMode } from '../../hooks/useToggleMode';

/** 상세페이지 모드 구분
 * (1) create - 생성 모드: 처음에 생성하여 작성 완료하기 전
 * (2) view - 조회 모드: 작성 완료 후 조회할 때
 * (3) edit - 수정 모드: 작성 완료 후 다시 수정할 때
 */
interface WorkspaceIssueDetailProps {
  initialMode: 'create' | 'view' | 'edit';
}

const WorkspaceIssueDetail = ({ initialMode }: WorkspaceIssueDetailProps) => {
  const [mode, setMode] = useState<'create' | 'view' | 'edit'>(initialMode); // 상세페이지 모드 상태
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<[Date | null, Date | null]>([null, null]); // '기한' 속성의 달력 드롭다운: 시작일, 종료일 2개를 저장
  const fakeIssueId = '123'; // 임시 goalId (TODO: 실제로는 이슈 작성 API로부터 받아온 result의 goalId 값을 사용 예정)

  const { isOpen, content } = useDropdownInfo(); // 현재 드롭다운의 열림 여부와 내용 가져옴
  const { openDropdown } = useDropdownActions();

  const isCompleted = mode === 'view'; // 작성 완료 여부 (view 모드일 때 true)
  const isEditable = mode === 'create' || mode === 'edit'; // 수정 가능 여부 (create 또는 edit 모드일 때 true)

  const handleToggleMode = useToggleMode({
    mode,
    setMode,
    type: 'issue',
    id: fakeIssueId,
    isDefaultTeam: true,
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
    없음: pr3,
    낮음: pr1,
    중간: pr2,
    높음: pr3,
    긴급: pr4,
  };

  // '담당자' 속성 아이콘 매핑 (나중에 API로부터 받아온 데이터로 대체 예정)
  const userIconMap = {
    담당자: IcProfile,
    없음: IcProfile,
    전채운: IcProfile,
    전시현: IcProfile,
  };

  const goalIconMap = {
    목표: IcGoal,
    없음: IcGoal,
    '백호를 사용해서 다른 사람들과 협업해보기': IcGoal,
    '기획 및 요구사항 분석': IcGoal,
  };

  return (
    <div className="flex flex-1 flex-col gap-[5.7rem] w-full px-[3.2rem] pt-[3.2rem] pb-[5.3rem]">
      {/* 상세페이지 헤더 */}
      <WorkspaceDetailHeader type={'issue'} defaultTitle="이슈를 생성하세요" title={title} />

      {/* 상세페이지 메인 */}
      <div className="flex px-[3.2rem] gap-[8.8rem] w-full h-full">
        {/* 상세페이지 좌측 영역 - 제목 & 상세설명 & 댓글 */}
        <div className="flex flex-col gap-[3.2rem] w-[calc(100%-33rem)] h-full">
          {/* 상세페이지 제목 */}
          <DetailTitle
            defaultTitle="이슈를 생성하세요"
            title={title}
            setTitle={setTitle}
            isEditable={isEditable}
          />

          {/* 상세 설명 작성 컴포넌트 */}
          <DetailTextEditor isEditable={isEditable} />

          {/* 댓글 영역 */}
          {isCompleted && <CommentSection />}
        </div>

        {/* 상세페이지 우측 영역 - 속성 탭 & 하단의 작성 완료 버튼 */}
        <div className="w-[33rem] h-full flex flex-col">
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
                <PropertyItem
                  defaultValue="담당자"
                  options={['없음', '전채운', '전시현']}
                  iconMap={userIconMap}
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
            onToggle={handleToggleMode}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceIssueDetail;
