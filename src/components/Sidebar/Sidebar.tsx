import SidebarItem from './SidebarItem';
import DropdownMenu from './DropdownMenu';
import goalIcon from '../../assets/icons/goal.svg';
import issueIcon from '../../assets/icons/issue.svg';
import externalIcon from '../../assets/icons/external.svg';
import bellIcon from '../../assets/icons/bell.svg';
import settingIcon from '../../assets/icons/setting.svg';
import vecocirclenavy from '../../assets/logos/veco-circle-logo-bg-navy.svg';
import vecocirclewhite from '../../assets/logos/veco-circle-logo-bg-white.svg';
import goalHoverIcon from '../../assets/icons/goal-hover.svg';
import issueHoverIcon from '../../assets/icons/issue-hover.svg';
import externalHoverIcon from '../../assets/icons/external-hover.svg';
import bellHoverIcon from '../../assets/icons/bell-hover.svg';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[32rem] bg-gray-200 p-[3.2rem] shadow-lg min-h-screen">
      <div className="flex flex-col items-start gap-[3.2rem] self-stretch">
        <div className="flex justify-between items-start self-stretch">
          <button
            type="button"
            className="flex items-center gap-[0.8rem] cursor-pointer"
            onClick={() => navigate('/workspace/team/default/issue')}
          >
            <img src={vecocirclenavy} className="w-[3.2rem] h-[3.2rem]" alt="Workspace" />
            <span className="font-body-b text-gray-600 letter-spacing-[-0.032rem]">Workspace</span>
          </button>
          <button
            type="button"
            className="flex w-[3.2rem] h-[3.2rem] p-[0.3rem] items-center justify-center cursor-pointer hover:bg-gray-300 rounded-[0.6rem] transition-colors duration-150 ease-in-out"
            onClick={() => navigate('/workspace/setting/ws-profile')}
          >
            <img src={settingIcon} width="full" height="full" alt="Setting" />
          </button>
        </div>

        <button
          type="button"
          className="group flex min-h-[3.2rem] items-center self-stretch gap-[0.8rem] hover:bg-gray-300 rounded-[0.6rem] cursor-pointer transition-colors duration-150 ease-in-out"
          onClick={() => navigate('/workspace/noti')}
        >
          <img
            src={bellIcon}
            className="w-[2.4rem] h-[2.4rem] block group-hover:hidden"
            alt="Bell"
          />
          <img
            src={bellHoverIcon}
            className="w-[2.4rem] h-[2.4rem] hidden group-hover:block"
            alt="Bell"
          />
          <span className="font-small-r text-gray-600 letter-spacing-[-0.028rem] group-hover:text-primary-blue group-hover:font-bold">
            알림
          </span>
        </button>

        <div className="flex flex-col items-start self-stretch">
          {/* 첫 번째 드롭다운: 워크스페이스 전체 팀 */}
          <DropdownMenu headerTitle="워크스페이스 전체 팀" initialOpen={true}>
            <div className="flex flex-col">
              <DropdownMenu
                headerTitle="Workspace"
                initialOpen={true}
                headerTeamIcon={
                  <img src={vecocirclenavy} className="w-[2.4rem] h-[2.4rem]" alt="Workspace" />
                }
                isNested={true}
              >
                <div className="flex flex-col justify-center items-flex-start gap-[1.6rem] pl-[3rem] pb-[1.6rem]">
                  <SidebarItem
                    defaultIcon={<img src={goalIcon} alt="Goal" />}
                    hoverIcon={<img src={goalHoverIcon} alt="Goal" />}
                    label="목표"
                    onClick={() => {
                      navigate(`/workspace/team/default/goal`);
                    }}
                    onAddClick={() => {
                      navigate(`/workspace/team/default/goal/:goalId`);
                    }}
                  />
                  <SidebarItem
                    defaultIcon={<img src={issueIcon} alt="Issue" />}
                    hoverIcon={<img src={issueHoverIcon} alt="Issue" />}
                    label="이슈"
                    onClick={() => {
                      navigate(`/workspace/team/default/issue`);
                    }}
                    onAddClick={() => {
                      navigate(`/workspace/team/default/issue/:issueId`);
                    }}
                  />
                  <SidebarItem
                    defaultIcon={<img src={externalIcon} alt="External" />}
                    hoverIcon={<img src={externalHoverIcon} alt="External" />}
                    label="외부"
                    onClick={() => {
                      navigate(`/workspace/team/default/ext`);
                    }}
                  />
                </div>
              </DropdownMenu>
            </div>
          </DropdownMenu>
        </div>
        {/* 두 번째 드롭다운: 나의 팀 (내부에 드롭다운 또 포함) */}
        <div className="flex flex-col items-start self-stretch">
          <DropdownMenu headerTitle="나의 팀" initialOpen={true}>
            {/* Team1 드롭다운 (내부 드롭다운) */}
            <DropdownMenu
              headerTitle="Team1"
              initialOpen={true} // Team1은 기본적으로 열려있게 설정
              headerTeamIcon={
                <img src={vecocirclewhite} className="w-[2.4rem] h-[2.4rem]" alt="Team" />
              }
              isNested={true}
            >
              <div className="flex flex-col justify-center items-start gap-[1.6rem] pl-[3rem] pb-[1.6rem]">
                <SidebarItem
                  defaultIcon={<img src={goalIcon} alt="Goal" />}
                  hoverIcon={<img src={goalHoverIcon} alt="Goal" />}
                  label="목표"
                  onClick={() => {
                    navigate(`/workspace/team/:teamId/goal`);
                  }}
                  onAddClick={() => {
                    navigate(`/workspace/team/:teamId/goal/:goalId`);
                  }}
                />
                <SidebarItem
                  defaultIcon={<img src={issueIcon} alt="Issue" />}
                  hoverIcon={<img src={issueHoverIcon} alt="Issue" />}
                  label="이슈"
                  onClick={() => {
                    navigate(`/workspace/team/:teamId/issue`);
                  }}
                  onAddClick={() => {
                    navigate(`/workspace/team/:teamId/issue/:issueId`);
                  }}
                />
                <SidebarItem
                  defaultIcon={<img src={externalIcon} alt="External" />}
                  hoverIcon={<img src={externalHoverIcon} alt="External" />}
                  label="외부"
                  onClick={() => {
                    navigate(`/workspace/team/:teamId/ext`);
                  }}
                />
              </div>
            </DropdownMenu>
            <DropdownMenu
              headerTitle="Team2"
              initialOpen={true} // Team2은 기본적으로 열려있게 설정
              headerTeamIcon={
                <img src={vecocirclewhite} className="w-[2.4rem] h-[2.4rem]" alt="Team" />
              }
              isNested={true}
            >
              <div className="flex flex-col justify-center items-start gap-[1.6rem] pl-[3rem] pb-[1.6rem]">
                <SidebarItem
                  defaultIcon={<img src={goalIcon} alt="Goal" />}
                  hoverIcon={<img src={goalHoverIcon} alt="Goal" />}
                  label="목표"
                  onClick={() => {
                    navigate(`/workspace/team/:teamId/goal`);
                  }}
                  onAddClick={() => {
                    navigate(`/workspace/team/:teamId/goal/:goalId`);
                  }}
                />
                <SidebarItem
                  defaultIcon={<img src={issueIcon} alt="Issue" />}
                  hoverIcon={<img src={issueHoverIcon} alt="Issue" />}
                  label="이슈"
                  onClick={() => {
                    navigate(`/workspace/team/:teamId/issue`);
                  }}
                  onAddClick={() => {
                    navigate(`/workspace/team/:teamId/issue/:issueId`);
                  }}
                />
                <SidebarItem
                  defaultIcon={<img src={externalIcon} alt="External" />}
                  hoverIcon={<img src={externalHoverIcon} alt="External" />}
                  label="외부"
                  onClick={() => {
                    navigate(`/workspace/team/:teamId/ext`);
                  }}
                />
              </div>
            </DropdownMenu>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
