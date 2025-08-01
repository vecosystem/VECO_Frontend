import TeamHeader from './components/TeamHeader.tsx';
import MemberItem from './components/MemberItem.tsx';
import { useState } from 'react';
import MemberInviteModal from './components/modal/MemberInviteModal.tsx';
import { LOCAL_STORAGE_KEY } from '../../constants/key.ts';
// import { useGetWorkspaceMembers } from '../../apis/setting/useGetWorkspaceMembers.ts';

const DUMMY_MEMBERS = [
  {
    id: 1,
    profileImage: 'https://avatars.githubusercontent.com/u/91470334?v=4',
    name: '이가을',
    email: 'gaeulzzang@gmail.com',
    teams: [
      {
        teamId: 1,
        teamName: '백호',
        teamProfileUrl: 'https://avatars.githubusercontent.com/u/91470334?v=4',
      },
    ],
    date: '25.01.01',
  },
  {
    id: 2,
    profileImage: null,
    name: '선우정아',
    email: 'mymelody@naver.com',
    teams: [
      {
        teamId: 2,
        teamName: '하늘',
        teamProfileUrl: 'https://avatars.githubusercontent.com/u/91470334?v=4',
      },
      {
        teamId: 3,
        teamName: '바다',
        teamProfileUrl: '',
      },
    ],
    date: '25.02.01',
  },
  {
    id: 3,
    profileImage: null,
    name: '가응가',
    email: 'gaeullee@gmail.com',
    teams: [
      {
        teamId: 1,
        teamName: '백호',
        teamProfileUrl: '',
      },
      {
        teamId: 2,
        teamName: '바다',
        teamProfileUrl: '',
      },
      {
        teamId: 3,
        teamName: '가을리',
        teamProfileUrl: '',
      },
    ],
    date: '25.03.01',
  },
  {
    id: 4,
    profileImage: null,
    name: '가을리',
    email: 'gaeulzzang11@naver.com',
    teams: [],
    date: '25.04.01',
  },
];

const SettingMember = () => {
  // const { data: members } = useGetWorkspaceMembers();
  const inviteUrl = localStorage.getItem(LOCAL_STORAGE_KEY.inviteUrl) || '';
  const invitePassword = localStorage.getItem(LOCAL_STORAGE_KEY.invitePassword) || '';
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
      {/*TODO: 멤버 조회 api 연동 시 주석 해제*/}
      {/*{members && members.length > 0 && (*/}
      {/*  <>*/}
      {/*    <MemberItem*/}
      {/*      key={members[0].memberId}*/}
      {/*      profileImage={members[0].profileUrl}*/}
      {/*      name={members[0].name}*/}
      {/*      email={members[0].email}*/}
      {/*      teams={members[0].teams}*/}
      {/*      date={members[0].joinedAt}*/}
      {/*      className={`py-[2.4rem]`}*/}
      {/*    />*/}
      {/*    <hr className={`w-full text-gray-300 mb-[2.4rem]`} />*/}
      {/*    {members.length > 1 &&*/}
      {/*      members*/}
      {/*        .slice(1)*/}
      {/*        .map((member, index) => (*/}
      {/*          <MemberItem*/}
      {/*            key={index}*/}
      {/*            profileImage={member.profileUrl}*/}
      {/*            name={member.name}*/}
      {/*            email={member.email}*/}
      {/*            teams={member.teams}*/}
      {/*            date={member.joinedAt}*/}
      {/*          />*/}
      {/*        ))}*/}
      {/*  </>*/}
      {/*)}*/}
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
          // memberName={members[0].name || ''}
          memberName={''}
          url={inviteUrl}
          password={invitePassword}
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
      )}
    </div>
  );
};

export default SettingMember;
