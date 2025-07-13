import IcUserSearch from '../../../assets/icons/user-round-search.svg';
import IcDate from '../../../assets/icons/date.svg';

interface TeamItemProps {
  name: string;
  memberCount: number;
  createdAt: string;
}

const TeamItem = (props: TeamItemProps) => {
  return (
    <div className={`flex w-full items-center px-[4.4rem] py-[2.4rem] text-gray-600 font-body-r`}>
      <div className={`rounded-full bg-gray-300 w-[2rem] h-[2rem]`} />
      <span className={`flex-1 text-start ms-[2rem]`}>{props.name}</span>
      <div className={`flex gap-x-[3.2rem]`}>
        <div className={`flex gap-x-[0.8rem] items-center`}>
          <img src={IcUserSearch} alt={'멤버 수'} />
          <span>{props.memberCount}</span>
        </div>
        <div className={`flex gap-x-[0.8rem] items-center`}>
          <img src={IcDate} alt={'생성일'} />
          <span>{props.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamItem;
