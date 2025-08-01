// WorkspaceGoalDetail.tsx
// 워크스페이스 전체 팀 목표 상세페이지

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
import IcIssue from '../../assets/icons/issue.svg';

import { getStatusColor } from '../../utils/listItemUtils';
import { statusLabelToCode } from '../../types/detailitem';
import CommentSection from '../../components/DetailView/Comment/CommentSection';
import CalendarDropdown from '../../components/Calendar/CalendarDropdown';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import { formatDateDot } from '../../utils/formatDate';
import ArrowDropdown from '../../components/Dropdown/ArrowDropdown';

const WorkspaceGoalDetail = () => {
  const [title, setTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // '기한' 속성의 달력 드롭다운: 시작일, 종료일 2개를 저장
  const [selectedDate, setSelectedDate] = useState<[Date | null, Date | null]>([null, null]);

  const [option, setOption] = useState<string>('이슈');
  const { isOpen, content } = useDropdownInfo(); // 현재 드롭다운의 열림 여부와 내용 가져옴
  const { openDropdown, closeDropdown } = useDropdownActions();

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

  // const dateIconMap = IcDate; // '기한' 속성 아이콘 매핑
  // const issueIconMap = IcIssue; // '이슈' 속성 아이콘 매핑

  const handleToggle = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <div className="flex flex-1 flex-col gap-[5.7rem] w-full px-[3.2rem] pt-[3.2rem] pb-[5.3rem]">
      {/* 상세페이지 헤더 */}
      <WorkspaceDetailHeader defaultTitle="목표를 생성하세요" title={title} />

      {/* 상세페이지 메인 */}
      <div className="flex px-[3.2rem] gap-[8.8rem] w-full h-full">
        {/* 상세페이지 좌측 영역 - 제목 & 상세설명 & 댓글 */}
        <div className="flex flex-col gap-[3.2rem] w-[calc(100%-33rem)] h-full">
          {/* 상세페이지 제목 */}
          <DetailTitle
            defaultTitle="목표를 생성하세요"
            title={title}
            setTitle={setTitle}
            isEditable={!isCompleted}
          />

          {/* 상세 설명 작성 컴포넌트 */}
          <DetailTextEditor isEditable={!isCompleted} />

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

              {/* (5) 이슈 */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openDropdown({ name: '이슈' });
                }}
                className={`flex w-full h-[3.2rem] px-[0.5rem] rounded-md items-center gap-[0.8rem] mb-[1.6rem] whitespace-nowrap hover:bg-gray-200 cursor-pointer`}
              >
                {/* 속성 아이콘 */}
                <img src={IcIssue} alt="이슈" />

                {/* 속성 이름 */}
                <div className="flex relative">
                  {/* 속성 항목명 */}
                  <p className="font-body-r text-gray-600 max-w-[27.4rem] truncate">{option}</p>

                  {/* 드롭다운 오픈 */}
                  {isOpen && content?.name === '이슈' && (
                    <ArrowDropdown
                      defaultValue={'이슈'}
                      options={[
                        '기능 정의: 구현할 핵심 기능과 어쩌구 저쩌구 텍스트가 길어지면 이렇게 표시',
                        '와이어프레임 디자인',
                        '컴포넌트 정리',
                      ]}
                      onSelect={(value: string) => setOption(value)}
                      onClose={closeDropdown}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 작성 완료 버튼 */}
          <CompletionButton
            isTitleFilled={title.trim().length > 0}
            isCompleted={isCompleted}
            onToggle={handleToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceGoalDetail;
