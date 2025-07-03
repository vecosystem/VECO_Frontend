import SidebarItem from './SidebarItem';
import DropdownMenu from './DropdownMenu';
import GoalIcon from '../../assets/icons/goal.svg?react';
import IssueIcon from '../../assets/icons/issue.svg?react';
import ExternalIcon from '../../assets/icons/external.svg?react';
import DocumentIcon from '../../assets/icons/document.svg?react';

const Sidebar = () => {
  return (
    <div className="w-[28rem] bg-white p-4 shadow-lg min-h-screen">
      {/* 첫 번째 드롭다운: 작업실 */}
      <DropdownMenu headerTitle="작업실" initialOpen={true}>
        <SidebarItem
          icon={<GoalIcon />}
          label="나의 목표"
          onAddClick={() => {}}
          onClick={() => {}}
        />
        <SidebarItem
          icon={<IssueIcon />}
          label="나의 이슈"
          onAddClick={() => {}}
          onClick={() => {}}
        />
      </DropdownMenu>
      <div className="my-4 border-b border-gray-200"></div> {/* 구분선 */}
      {/* 두 번째 드롭다운: 나의 팀 (내부에 드롭다운 또 포함) */}
      <DropdownMenu headerTitle="나의 팀" initialOpen={true}>
        {/* Team1 드롭다운 (내부 드롭다운) */}
        <DropdownMenu
          headerTitle="Team1"
          initialOpen={true} // Team1은 기본적으로 열려있게 설정
          isNested={true} // 중첩된 드롭다운임을 표시
        >
          <SidebarItem icon={<GoalIcon />} label="목표" onAddClick={() => {}} onClick={() => {}} />
          <SidebarItem icon={<IssueIcon />} label="이슈" onAddClick={() => {}} onClick={() => {}} />
          <SidebarItem icon={<ExternalIcon />} label="외부" onClick={() => {}} />
          <SidebarItem icon={<DocumentIcon />} label="문서" onClick={() => {}} />
        </DropdownMenu>
        {/* Team1 옆에 있는 프로필 아이콘들은 SidebarItem이 아니라 별도의 레이아웃으로 처리해야 할 수 있습니다. */}
        {/* 이미지상 Team1 드롭다운이 확장되면서 프로필 아이콘들이 아래로 밀려나는 구조라면, Team1 드롭다운 자체를 감싸는 부모 div에서 flex로 처리해야 합니다. */}
        {/* 예시: Team1 헤더 옆에 J와 O가 붙어있는 경우 */}
        {/*
  <div className="flex items-center justify-between">
      <DropdownMenu ...Team1 dropdown props...>
      <ProfileIconJ />
      <ProfileIconO />
  </div>
  */}
        {/* 다만, 이미지상으로 J와 O는 Team1 드롭다운 자체의 일부라기보다는 '나의 팀' 섹션의 다른 요소로 보입니다.
     만약 Team1 옆에 계속 J와 O가 고정되어 있다면 Team1 드롭다운 컴포넌트 외부에서 배치해야 합니다. */}
      </DropdownMenu>
    </div>
  );
};

export default Sidebar;
