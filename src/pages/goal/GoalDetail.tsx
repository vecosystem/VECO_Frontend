/**
 * GoalDetail.tsx
 * 목표 상세페이지
 *
 * @todo
 * - 필요한 컴포넌트 모두 구현
 * - 기타: 상세한 todo 항목 참고하여 작성 완료하기!
 */

import DetailHeader from '../../components/DetailView/DetailHeader';
import PropertyItem from '../../components/DetailView/PropertyItem';

// 우선순위 아이콘 svg import
import pr1 from '../../assets/icons/pr-1.svg';
import pr2 from '../../assets/icons/pr-2.svg';
import pr3 from '../../assets/icons/pr-3.svg';
import pr4 from '../../assets/icons/pr-4.svg';

// 상태 아이콘 svg import
/**
 * @todo
 * - 상태 아이콘을 추후 src/utils/listItemUtils.tsx의 아이콘 색상 매핑 활용하여 변경 예정
 */
import IcDoing from '../../assets/icons/status/doing.svg';
import IcDone from '../../assets/icons/status/done.svg';
import IcToDo from '../../assets/icons/status/todo.svg';
import IcReview from '../../assets/icons/status/review.svg';
import IcNone from '../../assets/icons/status/none.svg';

import IcDummyProfile from '../../assets/icons/gray.svg';
import DetailTitle from '../../components/DetailView/DetailTitle';
import { useState } from 'react';
import CompletionButton from '../../components/DetailView/CompletionButton';
import DetailTextEditor from '../../components/DetailView/DetailTextEditor';

const GoalDetail = () => {
  const [title, setTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const statusIconMap = {
    상태: IcNone,
    없음: IcNone,
    '해야할 일': IcToDo,
    진행중: IcDoing,
    완료: IcDone,
    검토: IcReview,
  };

  const priorityIconMap = {
    우선순위: pr3,
    없음: pr3,
    낮음: pr1,
    중간: pr2,
    높음: pr3,
    긴급: pr4,
  };

  // 담당자 아이콘 맵핑: 나중에 API로부터 받아온 데이터로 대체 예정
  const personIconMap = {
    담당자: IcDummyProfile,
    없음: IcDummyProfile,
    전채운: IcDummyProfile,
    전시현: IcDummyProfile,
  };

  const handleToggle = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    /* 주의 - 페이지 요소 최상단에 flex flex-1 추가해야 사이드바 오른쪽에 페이지를 꽉 채워 구성 가능 */
    <div className="flex flex-1 flex-col gap-[5.7rem] w-full p-[3.2rem]">
      {/* 상세페이지 헤더 */}
      <DetailHeader defaultTitle="목표를 생성하세요" title={title} />

      <div className="flex px-[3.2rem] gap-[8.8rem] w-full h-full">
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

          {/**
           * @todo
           * 댓글 영역 추가 예정
           */}
        </div>

        <div className="w-[33rem] h-full flex flex-col">
          <div className="w-full h-full flex flex-col gap-[1.6rem] ">
            {/* 속성 */}
            {/**
             * @todo
             * 각 항목 모두 분리하여 컴포넌트화할 것
             */}
            <div className="w-full font-title-sub-r tex-gray-600">속성</div>
            <div>
              {/* 상태 */}
              <PropertyItem
                defaultValue="상태"
                options={['없음', '해야할 일', '진행중', '완료', '검토']}
                iconMap={statusIconMap}
              />

              {/* 우선순위 */}
              <PropertyItem
                defaultValue="우선순위"
                options={['없음', '긴급', '높음', '중간', '낮음']}
                iconMap={priorityIconMap}
              />

              {/**
               * 담당자
               * @todo
               * 변수 적용하여 수정 필요
               */}
              <PropertyItem
                defaultValue="담당자"
                options={['없음', '전채운', '전시현']}
                iconMap={personIconMap}
              />

              {/**
               * @TODO
               * 기한 항목 구현 & 달력 드롭다운 연결
               * 이슈 항목 구현 & 이슈 드롭다운 컴포넌트 구현 후 연결
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
