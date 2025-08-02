import TeamItem from './components/TeamItem.tsx';
import TeamHeader from './components/TeamHeader.tsx';
import { useState } from 'react';
import TeamCreateModal from './components/modal/TeamCreateModal.tsx';
// import { useInView } from 'react-intersection-observer';
// import { useGetWorkspaceTeams } from '../../apis/setting/useGetWorkspaceTeams.ts';
// import TeamItemSkeleton from './components/TeamItemSkeleton.tsx';

const DUMMY_TEAMS = [
  {
    teamId: 1,
    teamImageUrl: 'https://avatars.githubusercontent.com/u/91470334?v=4',
    teamName: 'Workspace',
    memberCount: 10,
    createdAt: '25.01.01',
  },
  {
    teamId: 2,
    teamImageUrl: null,
    teamName: 'Team A',
    memberCount: 5,
    createdAt: '25.02.01',
  },
  {
    teamId: 3,
    teamImageUrl: null,
    teamName: 'Team B',
    memberCount: 8,
    createdAt: '25.03.01',
  },
  {
    teamId: 4,
    teamImageUrl: null,
    teamName: 'Team C',
    memberCount: 3,
    createdAt: '25.04.01',
  },
];

const SettingTeam = () => {
  // TODO: 팀 목록 조회 API 연동
  // const { ref, inView } = useInView();
  // const {
  //   data: teams,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   isLoading,
  // } = useGetWorkspaceTeams();
  // const allTeams = teams?.pages.flatMap((page) => page.teamList) || [];
  // const firstTeam = allTeams[0];
  // const restTeams = allTeams.slice(1);
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
      {/*{isLoading ? (*/}
      {/*  <TeamItemSkeleton />*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    {firstTeam && (*/}
      {/*      <TeamItem*/}
      {/*        teamImageUrl={firstTeam.teamImageUrl}*/}
      {/*        teamName={firstTeam.teamName}*/}
      {/*        memberCount={firstTeam.memberCount}*/}
      {/*        createdAt={firstTeam.createdAt}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*    <hr className={`w-full text-gray-300 mb-[2.4rem]`} />*/}
      {/*    {restTeams &&*/}
      {/*      restTeams.map((team, index) => (*/}
      {/*        <TeamItem*/}
      {/*          teamImageUrl={team.teamImageUrl}*/}
      {/*          key={index}*/}
      {/*          teamName={team.teamName}*/}
      {/*          memberCount={team.memberCount}*/}
      {/*          createdAt={team.createdAt}*/}
      {/*          className={`mb-[3.2rem]`}*/}
      {/*        />*/}
      {/*      ))}*/}
      {/*  </>*/}
      {/*)}*/}
      {/*{isFetchingNextPage && (*/}
      {/*  <>*/}
      {/*    <TeamItemSkeleton />*/}
      {/*    <TeamItemSkeleton />*/}
      {/*  </>*/}
      {/*)}*/}
      <TeamItem
        teamImageUrl={DUMMY_TEAMS[0].teamImageUrl}
        teamName={DUMMY_TEAMS[0].teamName}
        memberCount={DUMMY_TEAMS[0].memberCount}
        createdAt={DUMMY_TEAMS[0].createdAt}
        className={`py-[2.4rem]`}
      />

      {DUMMY_TEAMS.slice(1).map((team, index) => (
        <TeamItem
          teamImageUrl={team.teamImageUrl}
          key={index}
          teamName={team.teamName}
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
