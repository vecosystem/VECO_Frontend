import IcDate from '../../../assets/icons/date.svg';
import ProfileImage from './ProfileImage.tsx';
import SubProfileImage from './SubProfileImage.tsx';

type SettingMemberTeam = {
  id: number;
  name: string;
  teamProfileImage: string | null;
};

interface MemberItemProps {
  profileImage: string | null;
  name: string;
  email: string;
  teams?: SettingMemberTeam[];
  date: string;
  className?: string;
}

const MemberItem = (props: MemberItemProps) => {
  return (
    <div
      className={`flex w-full items-center text-gray-600 font-body-r ps-[4.3rem] pe-[4.9rem] ${props.className}`}
    >
      <ProfileImage profileImage={props.profileImage} className={'p-[0.4rem]'} />
      <span className={`ms-[4.1rem] text-start w-[6.4rem] truncate`}>{props.name}</span>
      <span className={`flex-1 ms-[2.8rem] text-start`}>{props.email}</span>
      <div className={`flex gap-x-[1.8rem]`}>
        <ProfileLayout teams={props.teams} />
        <div className={`flex gap-x-[0.8rem] items-center`}>
          <img src={IcDate} alt={'생성일'} />
          <span>{props.date}</span>
        </div>
      </div>
    </div>
  );
};

const ProfileLayout = ({ teams }: { teams?: SettingMemberTeam[] }) => {
  return (
    <div className={`flex w-[6.2rem] justify-start items-center`}>
      {teams && teams.length === 1 && <ProfileImage profileImage={teams[0].teamProfileImage} />}
      {teams && teams.length === 2 && (
        <div className={`flex relative items-center`}>
          <ProfileImage profileImage={teams[0].teamProfileImage} />
          <SubProfileImage profileImage={teams[1].teamProfileImage} />
        </div>
      )}
      {teams && teams.length >= 3 && (
        <div className={`flex relative items-center`}>
          <ProfileImage profileImage={teams[0].teamProfileImage} />
          <SubProfileImage profileImage={teams[1].teamProfileImage} />
          <span className="ms-[0.8rem] text-gray-600 font-body-r me-[0.86rem]">...</span>
        </div>
      )}
    </div>
  );
};

export default MemberItem;
