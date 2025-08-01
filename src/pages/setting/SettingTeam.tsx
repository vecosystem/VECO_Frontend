import TeamItem from './components/TeamItem.tsx';
import TeamHeader from './components/TeamHeader.tsx';
import { useState } from 'react';
import TeamCreateModal from './components/modal/TeamCreateModal.tsx';
// import { useInView } from 'react-intersection-observer';
// import { useGetWorkspaceTeams } from '../../apis/setting/useGetWorkspaceTeams.ts';

const DUMMY_TEAMS = [
  {
    id: 1,
    profileImage: 'https://avatars.githubusercontent.com/u/91470334?v=4',
    name: 'Workspace',
    memberCount: 10,
    createdAt: '25.01.01',
  },
  {
    id: 2,
    profileImage: null,
    name: 'Team A',
    memberCount: 5,
    createdAt: '25.02.01',
  },
  {
    id: 3,
    profileImage: null,
    name: 'Team B',
    memberCount: 8,
    createdAt: '25.03.01',
  },
  {
    id: 4,
    profileImage: null,
    name: 'Team C',
    memberCount: 3,
    createdAt: '25.04.01',
  },
];

const SettingTeam = () => {
  // TODO: 팀 목록 조회 API 연동
  // const { ref, inView } = useInView();
  // const { data: teams, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetWorkspaceTeams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  // }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <div className={`flex flex-col w-full`}>
      <TeamHeader
        type={'team'}
        title={'팀'}
        buttonText={'팀 생성하기'}
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
      <hr className={`w-full text-gray-300`} />
      <TeamItem
        profileImage={DUMMY_TEAMS[0].profileImage}
        name={DUMMY_TEAMS[0].name}
        memberCount={DUMMY_TEAMS[0].memberCount}
        createdAt={DUMMY_TEAMS[0].createdAt}
        className={`py-[2.4rem]`}
      />
      <hr className={`w-full text-gray-300 mb-[2.4rem]`} />
      {DUMMY_TEAMS.slice(1).map((team, index) => (
        <TeamItem
          profileImage={team.profileImage}
          key={index}
          name={team.name}
          memberCount={team.memberCount}
          createdAt={team.createdAt}
          className={`mb-[3.2rem]`}
        />
      ))}
      {isModalOpen && <TeamCreateModal onClick={() => setIsModalOpen(!isModalOpen)} />}
      {/*<div ref={ref} className={'h-[1rem]'} />*/}
    </div>
  );
};

export default SettingTeam;
