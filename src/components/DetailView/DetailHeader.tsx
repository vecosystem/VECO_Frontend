// 상세페이지 헤더 컴포넌트
// TODO: 팀명+목표 번호의 구조가 반영되게.
// TODO: 글 제목이 바뀜에 따라 실시간으로 반영되도록 수정.
import TeamIcon from '../ListView/TeamIcon';

const DetailHeader = () => {
  return (
    <div className="flex gap-[3.2rem] items-center">
      {/* 팀 아이콘, 팀명, props로 요소 전달 가능 */}
      <TeamIcon />
      <div className="flex gap-[1.6rem]">
        <div className="font-body-b text-gray-600">Veco - g3</div>
        <div className="font-body-r text-gray-400">목표를 생성하세요</div>
      </div>
    </div>
  );
};

export default DetailHeader;
