import TeamItem from './components/TeamItem.tsx';
import TeamHeader from './components/TeamHeader.tsx';

const SettingTeam = () => {
  const mockTeams = [
    {
      id: 1,
      profileImage: 'https://avatars.githubusercontent.com/u/91470334?v=4',
      name: 'Workspace',
      memberCount: 10,
      createdAt: '2025-01-01',
    },
    {
      id: 2,
      profileImage: null,
      name: 'Team A',
      memberCount: 5,
      createdAt: '2025-02-01',
    },
    {
      id: 3,
      profileImage: null,
      name: 'Team B',
      memberCount: 8,
      createdAt: '2025-03-01',
    },
    {
      id: 4,
      profileImage: null,
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
        profileImage={mockTeams[0].profileImage}
        name={mockTeams[0].name}
        memberCount={mockTeams[0].memberCount}
        createdAt={mockTeams[0].createdAt}
        className={`py-[2.4rem]`}
      />
      <hr className={`w-full text-gray-300 mb-[2.4rem]`} />
      {mockTeams.slice(1).map((team, index) => (
        <TeamItem
          profileImage={team.profileImage}
          key={index}
          name={team.name}
          memberCount={team.memberCount}
          createdAt={team.createdAt}
          className={`mb-[3.2rem]`}
        />
      ))}
    </div>
  );
};

export default SettingTeam;
