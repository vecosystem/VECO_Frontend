// GoalDetail.tsx
// 목표 상세페이지

import { useState } from 'react';
import DetailHeader from '../../components/DetailView/DetailHeader';
import PropertyItem from '../../components/DetailView/PropertyItem';
import DetailTitle from '../../components/DetailView/DetailTitle';
import CompletionButton from '../../components/DetailView/CompletionButton';
import DetailTextEditor from '../../components/DetailView/DetailTextEditor';

// 속성 항목별 아이콘 svg import
import pr1 from '../../assets/icons/pr-1-sm.svg';
import pr2 from '../../assets/icons/pr-2-sm.svg';
import pr3 from '../../assets/icons/pr-3-sm.svg';
import pr4 from '../../assets/icons/pr-4-sm.svg';
import IcDummyProfile from '../../assets/icons/user-circle-sm.svg';
// import IcDate from '../../assets/icons/date-lg.svg';
// import IcIssue from '../../assets/icons/issue.svg';

import { getStatusColor } from '../../utils/listItemUtils';
import { statusLabelToCode } from '../../types/detailitem';

const GoalDetail = () => {
  const [title, setTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // '우선순위' 속성 아이콘 매핑
  const priorityIconMap = {
    우선순위: pr3,
    없음: pr3,
    낮음: pr1,
    중간: pr2,
    높음: pr3,
    긴급: pr4,
  };

  const userIconMap = IcDummyProfile; // '담당자' 속성 아이콘 매핑 (나중에 API로부터 받아온 데이터로 대체 예정)
  // const dateIconMap = IcDate; // '기한' 속성 아이콘 매핑
  // const issueIconMap = IcIssue; // '이슈' 속성 아이콘 매핑

  const handleToggle = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <div className="flex flex-1 flex-col gap-[5.7rem] w-full p-[3.2rem]">
      {/* 상세페이지 헤더 */}
      <DetailHeader defaultTitle="목표를 생성하세요" title={title} />

      {/* 상세페이지 메인 */}
      <div className="flex px-[3.2rem] gap-[8.8rem] w-full h-full">
        {/* 상세페이지 좌측 영역 - 제목 & 상세 설명 & 댓글 영역 */}
        <div className="flex flex-col gap-[3.2rem] w-[calc(100%-33rem)]">
          {/* 상세페이지 제목 */}
          <DetailTitle
            defaultTitle="목표를 생성하세요"
            title={title}
            setTitle={setTitle}
            isEditable={!isCompleted}
          />

          {/* 상세 설명 작성 컴포넌트 */}
          <DetailTextEditor isEditable={!isCompleted} />
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
                  iconMap={{ 담당자: userIconMap }}
                />
              </div>

              {/* (4) 기한 */}
              {/* <PropertyItem defaultValue="기한" iconMap={{ 기한: dateIconMap }} /> */}

              {/* (5) 이슈 */}
              {/*
                <PropertyItem
                  defaultValue="이슈"
                  iconMap={{ 이슈: issueIconMap }}
                />
              */}
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

export default GoalDetail;
