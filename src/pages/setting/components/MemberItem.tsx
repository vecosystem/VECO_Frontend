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
      className={`flex w-full items-center text-gray-600 font-body-r px-[4.9rem] ${props.className}`}
    >
      <ProfileImage profileImage={props.profileImage} />
      <span className={`ms-[4.1rem] text-start w-[5.5rem] truncate`}>{props.name}</span>
      <span className={`flex-1 ms-[3.7rem] text-start`}>{props.email}</span>
      <div className={`flex gap-x-[0.8rem] items-center`}>
        <img src={IcDate} alt={'생성일'} />
        <span>{props.date}</span>
      </div>
    </div>
  );
};

export default MemberItem;
