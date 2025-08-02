import TeamHeader from './components/TeamHeader.tsx';
import MemberItem from './components/MemberItem.tsx';
import { useState } from 'react';
import MemberInviteModal from './components/modal/MemberInviteModal.tsx';

const DUMMY_MEMBERS = [
  {
    memberId: 1,
    profileImageUrl: 'https://avatars.githubusercontent.com/u/91470334?v=4',
    name: '이가을',
    email: 'gaeulzzang@gmail.com',
    teams: [
      { teamId: 1, teamName: 'veco1', teamImageUrl: null },
      {
        teamId: 2,
        teamName: 'veco2',
        teamImageUrl: 'https://avatars.githubusercontent.com/u/91470334?v=4',
      },
    ],
    joinedAt: '25.01.01',
  },
  {
    memberId: 2,
    profileImageUrl: null,
    name: '선우정아',
    email: 'mymelody@naver.com',
    teams: [],
    joinedAt: '25.02.01',
  },
  {
    memberId: 3,
    profileImageUrl: null,
    name: '가응가',
    email: 'gaeullee@gmail.com',
    teams: [{ teamId: 1, teamName: 'veco1', teamImageUrl: null }],
    joinedAt: '25.03.01',
  },
  {
    memberId: 4,
    profileImageUrl: null,
    name: '가을리',
    email: 'gaeulzzang11@naver.com',
    teams: [
      {
        teamId: 1,
        teamName: 'veco1',
        teamImageUrl: 'https://avatars.githubusercontent.com/u/91470334?v=4',
      },
      { teamId: 2, teamName: 'veco2', teamImageUrl: null },
      { teamId: 3, teamName: 'veco3', teamImageUrl: null },
    ],
    joinedAt: '25.04.01',
  },
];

const SettingMember = () => {
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
      <MemberItem
        profileImageUrl={DUMMY_MEMBERS[0].profileImageUrl}
        name={DUMMY_MEMBERS[0].name}
        email={DUMMY_MEMBERS[0].email}
        teams={DUMMY_MEMBERS[0].teams}
        joinedAt={DUMMY_MEMBERS[0].joinedAt}
        className={`py-[2.4rem]`}
      />
      <hr className={`w-full text-gray-300 mb-[2.4rem]`} />
      {DUMMY_MEMBERS.slice(1).map((member, index) => (
        <MemberItem
          key={index}
          profileImageUrl={member.profileImageUrl}
          name={member.name}
          email={member.email}
          teams={member.teams}
          joinedAt={member.joinedAt}
          className={`mb-[3.2rem]`}
        />
      ))}
      {isModalOpen && (
        <MemberInviteModal
          url={'https://veco-eight.vercel.app/invite'}
          password={'1234'}
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
      )}
    </div>
  );
};

export default SettingMember;
