import TeamItem from './components/TeamItem.tsx';
import TeamHeader from './components/TeamHeader.tsx';

const SettingTeam = () => {
  const mockTeams = [
    {
      id: 1,
      name: 'Workspace',
      memberCount: 10,
      createdAt: '2025-01-01',
    },
    {
      id: 2,
      name: 'Team A',
      memberCount: 5,
      createdAt: '2025-02-01',
    },
    {
      id: 3,
      name: 'Team B',
      memberCount: 8,
      createdAt: '2025-03-01',
    },
    {
      id: 4,
      name: 'Team C',
      memberCount: 3,
      createdAt: '2025-04-01',
    },
  ];

  return (
    <div className={`flex flex-col w-full`}>
      <TeamHeader
        title={'팀'}
        buttonText={'팀 생성하기'}
        onClick={() => {}}
        children={
          <>
            <div className={`flex gap-x-[1rem]`}>
              <span>아이콘</span>
              <span>팀 이름</span>
            </div>
            <div className={`flex gap-x-[6.8rem] me-[0.6rem]`}>
              <span>멤버 수</span>
              <span>생성일</span>
            </div>
          </>
        }
      />
      <hr className={`w-full text-gray-300`} />
      <TeamItem
        name={mockTeams[0].name}
        memberCount={mockTeams[0].memberCount}
        createdAt={mockTeams[0].createdAt}
      />
      <hr className={`w-full text-gray-300`} />
      {mockTeams.slice(1).map((team, index) => (
        <TeamItem
          key={index}
          name={team.name}
          memberCount={team.memberCount}
          createdAt={team.createdAt}
        />
      ))}
    </div>
  );
};

export default SettingTeam;
