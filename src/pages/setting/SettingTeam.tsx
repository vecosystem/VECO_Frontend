import TeamItem from './components/TeamItem.tsx';
import TeamHeader from './components/TeamHeader.tsx';
import { useState, useEffect } from 'react';
import TeamCreateModal from './components/modal/TeamCreateModal.tsx';
import { useInView } from 'react-intersection-observer';
import { useGetWorkspaceTeams } from '../../apis/setting/useGetWorkspaceTeams.ts';
import TeamItemSkeleton from './components/TeamItemSkeleton.tsx';
import { formatIsoToDot } from '../../utils/formatDate.ts';

const SettingTeam = () => {
  const { ref, inView } = useInView();
  const {
    data: teams,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetWorkspaceTeams();
  const allTeams = teams?.pages.flatMap((page) => page.teamList) || [];
  const firstTeam = allTeams[0];
  const restTeams = allTeams.slice(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <div className={`flex flex-col w-full`}>
      <TeamHeader
        type={'team'}
        title={'팀'}
        buttonText={'팀 생성하기'}
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
      <hr className={`w-full text-gray-300`} />
      {isLoading ? (
        <>
          {Array.from({ length: 10 }).map((_, idx) => (
            <TeamItemSkeleton key={idx} />
          ))}
        </>
      ) : (
        <>
          {firstTeam && (
            <TeamItem
              teamImageUrl={firstTeam.teamImageUrl}
              teamName={firstTeam.teamName}
              memberCount={firstTeam.memberCount}
              createdAt={formatIsoToDot(firstTeam.createdAt)}
              className={'py-[2.4rem]'}
            />
          )}
          <hr className={`w-full text-gray-300 mb-[2.4rem]`} />
          {restTeams &&
            restTeams.map((team, index) => (
              <TeamItem
                teamImageUrl={team.teamImageUrl}
                key={index}
                teamName={team.teamName}
                memberCount={team.memberCount}
                createdAt={formatIsoToDot(team.createdAt)}
                className={`mb-[3.2rem]`}
              />
            ))}
        </>
      )}
      {isFetchingNextPage && (
        <>
          <TeamItemSkeleton />
          <TeamItemSkeleton />
        </>
      )}
      {isModalOpen && <TeamCreateModal onClick={() => setIsModalOpen(!isModalOpen)} />}
      <div ref={ref} className={'h-[1rem]'} />
    </div>
  );
};

export default SettingTeam;
