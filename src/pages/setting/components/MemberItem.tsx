import IcDate from '../../../assets/icons/date.svg';
import ProfileImage from './ProfileImage.tsx';
import SubProfileImage from './SubProfileImage.tsx';
import { useDropdownActions, useDropdownInfo } from '../../../hooks/useDropdown.ts';
import Dropdown from '../../../components/Dropdown/Dropdown.tsx';

type SettingMemberTeam = {
  teamId: number;
  teamName: string;
  teamImageUrl: string | null;
};

interface MemberItemProps {
  profileImageUrl: string | null;
  name: string;
  email: string;
  teams?: SettingMemberTeam[];
  joinedAt: string;
  className?: string;
}

const MemberItem = (props: MemberItemProps) => {
  const { isOpen, content } = useDropdownInfo();
  const { openDropdown, closeDropdown } = useDropdownActions();

  return (
    <div
      className={`flex w-full items-center text-gray-600 font-body-r ps-[4.3rem] pe-[4.9rem] whitespace-nowrap ${props.className}`}
    >
      <ProfileImage profileImage={props.profileImageUrl} className={'p-[0.4rem]'} />
      <span className={`ms-[4.1rem] text-start w-[6.4rem] truncate`}>{props.name}</span>
      <span className={`flex-1 ms-[2.8rem] text-start truncate`}>{props.email}</span>
      <div className={`flex gap-x-[1.8rem]`}>
        <section className={`relative`}>
          <ProfileLayout teams={props.teams} onClick={() => openDropdown({ name: props.name })} />
          {isOpen && content?.name == props.name && (
            <Dropdown
              options={props.teams?.map((team) => team.teamName) || []}
              onSelect={() => {}}
              onClose={closeDropdown}
              className={`right-0 top-[2.4rem]`}
            />
          )}
        </section>
        <div className={`flex gap-x-[0.8rem] items-center`}>
          <img src={IcDate} alt={'생성일'} />
          <span className={`truncate`}>{props.joinedAt}</span>
        </div>
      </div>
    </div>
  );
};

const ProfileLayout = ({
  teams,
  onClick,
}: {
  teams?: SettingMemberTeam[];
  onClick: () => void;
}) => {
  return (
    <div className={`flex w-[6.2rem] justify-start items-center`} onClick={onClick}>
      {teams && teams.length === 1 && <ProfileImage profileImage={teams[0].teamImageUrl} />}
      {teams && teams.length === 2 && (
        <div className={`flex relative items-center`}>
          <ProfileImage profileImage={teams[0].teamImageUrl} />
          <SubProfileImage profileImage={teams[1].teamImageUrl} />
        </div>
      )}
      {teams && teams.length >= 3 && (
        <div className={`flex relative items-center`}>
          <ProfileImage profileImage={teams[0].teamImageUrl} />
          <SubProfileImage profileImage={teams[1].teamImageUrl} />
          <span className="ms-[0.8rem] text-gray-600 font-body-r me-[0.86rem]">...</span>
        </div>
      )}
    </div>
  );
};

export default MemberItem;
