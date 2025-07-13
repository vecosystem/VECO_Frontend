import TeamHeader from './components/TeamHeader.tsx';
import MemberItem from './components/MemberItem.tsx';

const SettingMember = () => {
  const mockMembers = [
    {
      id: 1,
      profileImage: 'https://avatars.githubusercontent.com/u/91470334?v=4',
      name: '이가을',
      email: 'gaeulzzang@gmail.com',
      date: '2025-01-01',
    },
    {
      id: 2,
      profileImage: null,
      name: '마이멜로디',
      email: 'mymelody@naver.com',
      date: '2025-02-01',
    },
    {
      id: 3,
      profileImage: null,
      name: '가응가',
      email: 'gaeullee@gmail.com',
      date: '2025-03-01',
    },
  ];

  return (
    <div className={`flex flex-col w-full`}>
      <TeamHeader
        title={'멤버'}
        buttonText={'팀원 초대하기'}
        onClick={() => {}}
        children={
          <>
            <div className={`flex gap-x-[1rem]`}>
              <span>아이콘</span>
              <span>멤버이름</span>
              <span className={`ms-[0.45rem]`}>이메일</span>
            </div>
            <div className={`flex`}>
              <span>참여일</span>
            </div>
          </>
        }
      />
      <hr className={`w-full text-gray-300`} />
      <MemberItem
        profileImage={mockMembers[0].profileImage}
        name={mockMembers[0].name}
        email={mockMembers[0].email}
        date={mockMembers[0].date}
        className={`py-[2.4rem]`}
      />
      <hr className={`w-full text-gray-300 mb-[2.4rem]`} />
      {mockMembers.slice(1).map((member, index) => (
        <MemberItem
          key={index}
          profileImage={member.profileImage}
          name={member.name}
          email={member.email}
          date={member.date}
          className={`mb-[3.2rem]`}
        />
      ))}
    </div>
  );
};

export default SettingMember;
