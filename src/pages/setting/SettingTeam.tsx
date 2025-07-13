import TeamItem from './components/TeamItem.tsx';

const SettingTeam = () => {
  return (
    <div className={`flex flex-col w-full`}>
      <section className={`flex flex-col px-[3.2rem] pt-[3.2rem] pb-[1rem]`}>
        <h1 className={`text-gray-600 font-title-b mb-[1.6rem]`}>팀</h1>
        <div className={`flex justify-end`}>
          <button
            className={`bg-primary-blue rounded-[0.6rem] text-gray-100 font-small-r px-[0.9rem] py-[0.8rem]`}
          >
            팀 생성하기
          </button>
        </div>
        <div
          className={`flex w-full mt-[2rem] justify-between items-center text-gray-600 font-body-b pe-[3rem]`}
        >
          <div className={`flex gap-x-[1rem]`}>
            <span>아이콘</span>
            <span>팀 이름</span>
          </div>
          <div className={`flex gap-x-[6.8rem]`}>
            <span>멤버 수</span>
            <span>생성일</span>
          </div>
        </div>
      </section>
      <hr className={`w-full text-gray-300`} />
      <TeamItem />
      <hr className={`w-full text-gray-300`} />
      <TeamItem />
      <TeamItem />
      <TeamItem />
    </div>
  );
};

export default SettingTeam;
