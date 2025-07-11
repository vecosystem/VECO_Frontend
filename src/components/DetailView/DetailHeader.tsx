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
