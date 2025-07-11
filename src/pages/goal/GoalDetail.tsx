import DetailHeader from '../../components/DetailView/DetailHeader';
import PropertyItem from '../../components/DetailView/PropertyItem';

// 우선순위 아이콘 svg import
import pr0 from '../../assets/icons/pr-0.svg';
import pr1 from '../../assets/icons/pr-1.svg';
import pr2 from '../../assets/icons/pr-2.svg';
import pr3 from '../../assets/icons/pr-3.svg';
import pr4 from '../../assets/icons/pr-4.svg';

// 상태 아이콘 svg import
// TODO: 추후 src/utils/listItemUtils.tsx의 아이콘 색상 매핑 활용하여 변경 예정
import IcDoing from '../../assets/icons/status/doing.svg';
import IcDone from '../../assets/icons/status/done.svg';
import IcToDo from '../../assets/icons/status/todo.svg';
import IcReview from '../../assets/icons/status/review.svg';
import IcNone from '../../assets/icons/status/none.svg';

import IcDummyProfile from '../../assets/icons/gray.svg';
import IcCheckSm from '../../assets/icons/check-sm.svg';

const GoalDetail = () => {
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

  return (
    <div className="flex flex-col gap-[5.7rem] w-full">
      {/* 헤더 컴포넌트: 글 제목에 따라 실시간으로 바뀌도록 수정 */}
      {/* 목표명: 팀명+목표번호가 반영되게 */}
      <DetailHeader />
      <div className="flex px-[3.2rem] gap-[8.8rem] w-full h-full">
        {/* 글 작성란 */}
        <div className="flex flex-col gap-[3.2rem] w-[calc(100%-33rem)]">
          <input
            type="text"
            placeholder="목표를 생성하세요"
            className="w-full font-bigtitle-b placeholder-gray-400 text-gray-600 focus:outline-none"
          />
          {/* 상세 설명 컴포넌트: 추후 텍스트 에디터 반영. */}
          <textarea
            className="w-full h-[29.8rem] font-body-r placeholder-gray-400 text-gray-600 overflow-y-auto resize-none focus:outline-none pr-4"
            placeholder="상세 설명 추가"
          ></textarea>

          {/* TODO: 댓글 영역 추가 예정 */}
        </div>

        <div className="w-[33rem] h-full flex flex-col">
          <div className="w-full flex flex-col gap-[1.6rem] ">
            {/* 속성 */}
            {/* TODO: 각 항목 모두 분리하여 컴포넌트화할 것 */}
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
              {/* 담당자 */}
              {/* TODO: 변수 적용하여 수정 필요 */}
              <PropertyItem
                defaultValue="담당자"
                options={['없음', '전채운', '전시현']}
                iconMap={personIconMap}
              />
              {/* TODO: 기한, 이슈 항목은 구현 예정 */}
            </div>
          </div>

          {/* 작성 완료 버튼 */}
          {/* 컴포넌트로 만들기. 최초 생성일 때, 그리고 수정-작성완료 토글되게. */}
          {/* 제목이 필수입력 되어야 활성화되게 */}
          <div className="w-full h-full flex items-end justify-end mb-[1.6rem]">
            <button className="flex items-center justify-center gap-[0.8rem] h-[3.6rem] py-[0.8rem] pl-[1.2rem] pr-[1.6rem] bg-gray-200 rounded-md">
              <img src={IcCheckSm} alt="확인" />
              <div className="font-small-b text-gray-400">작성 완료</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetail;
