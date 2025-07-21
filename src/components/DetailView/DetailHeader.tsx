// DetailHeader.tsx
// 상세페이지 헤더 컴포넌트

import { dummyStatusGoalGroups } from '../../types/testDummy';
import TeamIcon from '../ListView/TeamIcon';

interface DetailHeaderProps {
  defaultTitle: string; // 상세페이지 제목에 아무것도 입력되지 않았을 때 기본 타이틀
  title: string; // 상세페이지 제목으로부터 전달받아올 타이틀
}

const DetailHeader = ({ defaultTitle, title }: DetailHeaderProps) => {
  // 상세페이지의 ID 체계 : 일단 dummy 데이터 첫번째를 임의로 가져옴.
  // 추후 실제 API 연결하면서 다시 작성할 예정
  const groupIndex = 0;
  const goalIndex = 0;
  const detailId = dummyStatusGoalGroups[groupIndex]?.goals[goalIndex]?.name;

  return (
    <div className="flex gap-[3.2rem] flex-nowrap">
      {/* 팀 아이콘, 팀명, props로 요소 전달 가능 */}
      <TeamIcon />
      <div className="flex gap-[1.6rem] items-center overflow-hidden">
        {/* 상세페이지 ID */}
        <div className="flex whitespace-nowrap font-body-b text-gray-600">{detailId}</div>
        {/**
         * 상세페이지 이름
         * - 상세페이지 제목에 아무것도 입력되지 않았을 때는 defaultTitle(placeholder명과 동일) 렌더링
         * - 입력됐을 때는 title(상세페이지 제목에 입력한 문자열) 렌더링
         */}
        <div className="font-body-r text-gray-400 truncate">{title || defaultTitle}</div>
      </div>
    </div>
  );
};

export default DetailHeader;
