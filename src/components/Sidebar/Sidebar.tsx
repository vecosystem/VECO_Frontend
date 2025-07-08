import SidebarItem from './SidebarItem';
import DropdownMenu from './DropdownMenu';
import goalIcon from '../../assets/icons/goal.svg';
import issueIcon from '../../assets/icons/issue.svg';
import externalIcon from '../../assets/icons/external.svg';
import documentIcon from '../../assets/icons/document.svg';
import grayIcon from '../../assets/icons/gray.svg';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[28rem] bg-white p-4 shadow-lg min-h-screen">
      {/* 첫 번째 드롭다운: 작업실 */}
      <DropdownMenu headerTitle="작업실" initialOpen={true}>
        <SidebarItem
          icon={<img src={externalIcon} alt="External" />}
          label="나의 목표"
          onClick={() => {
            navigate('/my/mygoal');
          }}
          onAddClick={() => {
            navigate('/my/mygoal/:myGoalId');
          }}
        />
        <SidebarItem
          icon={<img src={documentIcon} alt="Document" />}
          label="나의 이슈"
          onClick={() => {
            navigate('/my/myissue');
          }}
          onAddClick={() => {
            navigate('/my/myissue/:myIssueId');
          }}
        />
      </DropdownMenu>
      <div className="my-4 border-b border-gray-200"></div> {/* 구분선 */}
      {/* 두 번째 드롭다운: 나의 팀 (내부에 드롭다운 또 포함) */}
      <DropdownMenu headerTitle="나의 팀" initialOpen={true}>
        {/* Team1 드롭다운 (내부 드롭다운) */}
        <DropdownMenu
          headerTitle="Team1"
          initialOpen={true} // Team1은 기본적으로 열려있게 설정
          headerTeamIcon={<img src={grayIcon} alt="Team" />}
          isNested={true} // 중첩된 드롭다운임을 표시
        >
          <div className="flex flex-col pl-12">
            <SidebarItem
              icon={<img src={goalIcon} alt="Goal" />}
              label="목표"
              onClick={() => {
                navigate(`/team/:teamId/goal`);
              }}
              onAddClick={() => {
                navigate(`/team/:teamId/goal/:goalId`);
              }}
            />
            <SidebarItem
              icon={<img src={issueIcon} alt="Issue" />}
              label="이슈"
              onClick={() => {
                navigate(`/team/:teamId/issue`);
              }}
              onAddClick={() => {
                navigate(`/team/:teamId/issue/:issueId`);
              }}
            />
            <SidebarItem
              icon={<img src={externalIcon} alt="External" />}
              label="외부"
              onClick={() => {
                navigate(`/team/:teamId/ext`);
              }}
            />
            <SidebarItem
              icon={<img src={documentIcon} alt="Document" />}
              label="문서"
              onClick={() => {
                navigate(`/team/:teamId/doc`);
              }}
            />
          </div>
        </DropdownMenu>
        <DropdownMenu
          headerTitle="Team2"
          initialOpen={true} // Team2은 기본적으로 열려있게 설정
          headerTeamIcon={<img src={grayIcon} alt="Team" />}
          isNested={true} // 중첩된 드롭다운임을 표시
        >
          <div className="flex flex-col pl-12">
            <SidebarItem
              icon={<img src={goalIcon} alt="Goal" />}
              label="목표"
              onClick={() => {
                navigate(`/team/:teamId/goal`);
              }}
              onAddClick={() => {
                navigate(`/team/:teamId/goal/:goalId`);
              }}
            />
            <SidebarItem
              icon={<img src={issueIcon} alt="Issue" />}
              label="이슈"
              onClick={() => {
                navigate(`/team/:teamId/issue`);
              }}
              onAddClick={() => {
                navigate(`/team/:teamId/issue/:issueId`);
              }}
            />
            <SidebarItem
              icon={<img src={externalIcon} alt="External" />}
              label="외부"
              onClick={() => {
                navigate(`/team/:teamId/ext`);
              }}
            />
            <SidebarItem
              icon={<img src={documentIcon} alt="Document" />}
              label="문서"
              onClick={() => {
                navigate(`/team/:teamId/doc`);
              }}
            />
          </div>
        </DropdownMenu>
      </DropdownMenu>
    </div>
  );
};

export default Sidebar;
