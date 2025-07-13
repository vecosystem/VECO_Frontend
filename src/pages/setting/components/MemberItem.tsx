import IcDate from '../../../assets/icons/date.svg';
import ProfileImage from './ProfileImage.tsx';

interface MemberItemProps {
  profileImage: string | null;
  name: string;
  email: string;
  date: string;
  className?: string;
}

const MemberItem = (props: MemberItemProps) => {
  return (
    <div
      className={`flex w-full items-center text-gray-600 font-body-r px-[4.35rem] ${props.className}`}
    >
      <div className={`flex flex-1 gap-[2rem]`}>
        <ProfileImage profileImage={props.profileImage} />
        <span>{props.name}</span>
        <span>{props.email}</span>
      </div>
      <div className={`flex gap-x-[0.8rem] items-center`}>
        <img src={IcDate} alt={'생성일'} />
        <span>{props.date}</span>
      </div>
    </div>
  );
};

export default MemberItem;
