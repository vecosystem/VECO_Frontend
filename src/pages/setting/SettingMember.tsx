import TeamHeader from './components/TeamHeader.tsx';
import MemberItem from './components/MemberItem.tsx';
import { useState } from 'react';
import MemberInviteModal from './components/modal/MemberInviteModal.tsx';
import { LOCAL_STORAGE_KEY } from '../../constants/key.ts';
import { useGetWorkspaceMembers } from '../../apis/setting/useGetWorkspaceMembers.ts';
import { formatIsoToDot } from '../../utils/formatDate.ts';
import { useGetWorkspaceProfile } from '../../apis/setting/useGetWorkspaceProfile.ts';
import { useGetMyProfile } from '../../apis/setting/useGetMyProfile.ts';

const SettingMember = () => {
  const { data: workspaceProfile } = useGetWorkspaceProfile();
  const { data: members } = useGetWorkspaceMembers();
  const { data: myProfile } = useGetMyProfile();
  const inviteUrl =
    localStorage.getItem(LOCAL_STORAGE_KEY.inviteUrl) || workspaceProfile?.workspaceUrl || '';
  const invitePassword = localStorage.getItem(LOCAL_STORAGE_KEY.invitePassword) || '';
  const memberName = localStorage.getItem(LOCAL_STORAGE_KEY.name) || myProfile?.name || '';
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`flex flex-col w-full`}>
      <TeamHeader
        type={'member'}
        title={'멤버'}
        buttonText={'팀원 초대하기'}
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
      <hr className={`w-full text-gray-300`} />
      {members && members.length > 0 && (
        <>
          <MemberItem
            key={members[0].memberId}
            profileImageUrl={members[0].profileImageUrl}
            name={members[0].name}
            email={members[0].email}
            teams={members[0].teams}
            joinedAt={formatIsoToDot(members[0].joinedAt)}
            className={`py-[2.4rem]`}
          />
          <hr className={`w-full text-gray-300 mb-[2.4rem]`} />
          {members.length > 1 &&
            members
              .slice(1)
              .map((member, index) => (
                <MemberItem
                  key={index}
                  profileImageUrl={member.profileImageUrl}
                  name={member.name}
                  email={member.email}
                  teams={member.teams}
                  joinedAt={formatIsoToDot(member.joinedAt)}
                />
              ))}
        </>
      )}
      {isModalOpen && <MemberInviteModal onClick={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default SettingMember;
