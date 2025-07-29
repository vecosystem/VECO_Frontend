import IcUserSearch from '../../../assets/icons/user-round-search.svg';
import IcDate from '../../../assets/icons/date.svg';
import ProfileImage from './ProfileImage.tsx';

interface TeamItemProps {
  profileImage: string | null;
  name: string;
  memberCount: number;
  createdAt: string;
  className?: string;
}

const TeamItem = (props: TeamItemProps) => {
  return (
    <div
      className={`flex w-full items-center text-gray-600 font-body-r ps-[4.3rem] pe-[4.9rem] whitespace-nowrap ${props.className}`}
    >
      <ProfileImage profileImage={props.profileImage} className={`p-[0.4rem]`} />
      <span className={`flex-1 text-start ms-[3.9rem] truncate`}>{props.name}</span>
      <div className={`flex gap-x-[2.8rem]`}>
        <div className={`flex gap-x-[0.8rem] items-center`}>
          <img src={IcUserSearch} alt={'멤버 수'} />
          <span>{props.memberCount}</span>
        </div>
        <div className={`flex gap-x-[0.8rem] items-center`}>
          <img src={IcDate} alt={'생성일'} />
          <span className={`truncate`}>{props.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamItem;
