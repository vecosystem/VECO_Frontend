interface TeamHeaderProps {
  type: 'team' | 'member';
  title: string;
  buttonText: string;
  onClick: () => void;
}

const TeamHeader = (props: TeamHeaderProps) => {
  return (
    <section className={`flex flex-col px-[3.2rem] pt-[3.2rem] pb-[1rem]`}>
      <h1 className={`text-gray-600 font-title-b mb-[1.6rem]`}>{props.title}</h1>
      <div className={`flex justify-end`}>
        <button
          className={`bg-primary-blue rounded-[0.6rem] text-gray-100 font-small-r px-[0.9rem] py-[0.8rem]`}
          onClick={props.onClick}
        >
          {props.buttonText}
        </button>
      </div>
      <div
        className={`flex w-full mt-[2rem] justify-between items-center text-gray-600 font-body-b pe-[6.8rem]`}
      >
        {props.type === 'team' ? (
          <>
            <div className={`flex gap-x-[3.2rem]`}>
              <span>아이콘</span>
              <span>팀 이름</span>
            </div>
            <div className={`flex gap-x-[3.2rem]`}>
              <span>멤버 수</span>
              <span>생성일</span>
            </div>
          </>
        ) : (
          <>
            <div className={`flex gap-x-[3.2rem]`}>
              <span>아이콘</span>
              <span>멤버이름</span>
              <span className={`mx-[0.45rem]`}>이메일</span>
            </div>
            <div className={`flex gap-x-[6.1rem]`}>
              <span>팀</span>
              <span>참여일</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TeamHeader;
