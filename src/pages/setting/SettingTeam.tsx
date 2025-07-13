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
      <TeamHeader />
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
