import SidebarItem from './SidebarItem';
import DropdownMenu from './DropdownMenu';
import GoalIcon from '../../assets/icons/goal.svg?react';
import IssueIcon from '../../assets/icons/issue.svg?react';
import ExternalIcon from '../../assets/icons/external.svg?react';
import DocumentIcon from '../../assets/icons/document.svg?react';
import GrayIcon from '../../assets/icons/gray.svg?react';

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
          headerTeamIcon={<GrayIcon />}
          isNested={true} // 중첩된 드롭다운임을 표시
        >
          <div className="flex flex-col pl-12">
            <SidebarItem
              icon={<GoalIcon />}
              label="목표"
              onAddClick={() => {}}
              onClick={() => {}}
            />
            <SidebarItem
              icon={<IssueIcon />}
              label="이슈"
              onAddClick={() => {}}
              onClick={() => {}}
            />
            <SidebarItem icon={<ExternalIcon />} label="외부" onClick={() => {}} />
            <SidebarItem icon={<DocumentIcon />} label="문서" onClick={() => {}} />
          </div>
        </DropdownMenu>
        <DropdownMenu
          headerTitle="Team2"
          initialOpen={true} // Team2은 기본적으로 열려있게 설정
          headerTeamIcon={<GrayIcon />}
          isNested={true} // 중첩된 드롭다운임을 표시
        >
          <div className="flex flex-col pl-12">
            <SidebarItem
              icon={<GoalIcon />}
              label="목표"
              onAddClick={() => {}}
              onClick={() => {}}
            />
            <SidebarItem
              icon={<IssueIcon />}
              label="이슈"
              onAddClick={() => {}}
              onClick={() => {}}
            />
            <SidebarItem icon={<ExternalIcon />} label="외부" onClick={() => {}} />
            <SidebarItem icon={<DocumentIcon />} label="문서" onClick={() => {}} />
          </div>
        </DropdownMenu>
      </DropdownMenu>
    </div>
  );
};

export default Sidebar;
