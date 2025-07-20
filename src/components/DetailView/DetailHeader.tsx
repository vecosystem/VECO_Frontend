/**
 * DetailHeader.tsx
 * 상세페이지 헤더 컴포넌트
 *
 * @todo
 * - 팀명+목표 번호의 구조가 반영되게
 */

import TeamIcon from '../ListView/TeamIcon';

interface DetailHeaderProps {
  defaultTitle: string; // 상세페이지 제목에 아무것도 입력되지 않았을 때 기본 타이틀
  title: string; // 상세페이지 제목으로부터 전달받아올 타이틀
}

const DetailHeader = ({ defaultTitle, title }: DetailHeaderProps) => {
  return (
    <div className="flex gap-[3.2rem] items-center">
      {/* 팀 아이콘, 팀명, props로 요소 전달 가능 */}
      <TeamIcon />
      <div className="flex gap-[1.6rem]">
        <div className="font-body-b text-gray-600">Veco - i3</div>
        {/* 상세페이지에 아무것도 입력되지 않았을 때는 defaultTitle 렌더링, 입력됐을 때는 title 렌더링 */}
        <div className="font-body-r text-gray-400">{title || defaultTitle}</div>
      </div>
    </div>
  );
};

export default DetailHeader;
