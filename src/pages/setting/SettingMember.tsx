import TeamHeader from './components/TeamHeader.tsx';
import MemberItem from './components/MemberItem.tsx';
import { useState } from 'react';
import MemberInviteModal from './components/modal/MemberInviteModal.tsx';

const DUMMY_MEMBERS = [
  {
    id: 1,
    profileImage: 'https://avatars.githubusercontent.com/u/91470334?v=4',
    name: '이가을',
    email: 'gaeulzzang@gmail.com',
    teams: [
      { id: 1, name: 'veco1', teamProfileImage: null },
      {
        id: 2,
        name: 'veco2',
        teamProfileImage: 'https://avatars.githubusercontent.com/u/91470334?v=4',
      },
    ],
    date: '25.01.01',
  },
  {
    id: 2,
    profileImage: null,
    name: '선우정아',
    email: 'mymelody@naver.com',
    teams: [],
    date: '25.02.01',
  },
  {
    id: 3,
    profileImage: null,
    name: '가응가',
    email: 'gaeullee@gmail.com',
    teams: [{ id: 1, name: 'veco1', teamProfileImage: null }],
    date: '25.03.01',
  },
  {
    id: 4,
    profileImage: null,
    name: '가을리',
    email: 'gaeulzzang11@naver.com',
    teams: [
      {
        id: 1,
        name: 'veco1',
        teamProfileImage: 'https://avatars.githubusercontent.com/u/91470334?v=4',
      },
      { id: 2, name: 'veco2', teamProfileImage: null },
      { id: 3, name: 'veco3', teamProfileImage: null },
    ],
    date: '25.04.01',
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
        profileImage={DUMMY_MEMBERS[0].profileImage}
        name={DUMMY_MEMBERS[0].name}
        email={DUMMY_MEMBERS[0].email}
        teams={DUMMY_MEMBERS[0].teams}
        date={DUMMY_MEMBERS[0].date}
        className={`py-[2.4rem]`}
      />
      <hr className={`w-full text-gray-300 mb-[2.4rem]`} />
      {DUMMY_MEMBERS.slice(1).map((member, index) => (
        <MemberItem
          key={index}
          profileImage={member.profileImage}
          name={member.name}
          email={member.email}
          teams={member.teams}
          date={member.date}
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
