import SidebarItem from './SidebarItem';
import DropdownMenu from './DropdownMenu';
import goalIcon from '../../assets/icons/goal.svg';
import issueIcon from '../../assets/icons/issue.svg';
import externalIcon from '../../assets/icons/external.svg';
import bellIcon from '../../assets/icons/bell.svg';
import settingIcon from '../../assets/icons/setting.svg';
import vecocirclenavy from '../../assets/logos/veco-circle-logo-bg-navy.svg';
import vecocirclewhite from '../../assets/logos/veco-circle-logo-bg-white.svg';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[32rem] bg-gray-200 p-[3.2rem] shadow-lg min-h-screen">
      <div className="flex flex-col items-start gap-[3.2rem] self-stretch">
        <div className="flex justify-between items-start self-stretch">
          <button type="button" className="flex items-center gap-[0.8rem] cursor-pointer">
            <img src={vecocirclenavy} className="w-[3.2rem] h-[3.2rem]" alt="Workspace" />
            <span className="font-body-b text-gray-600 letter-spacing-[-0.032rem]">Workspace</span>
          </button>
          <button
            type="button"
            className="flex w-[3.2rem] h-[3.2rem] p-[0.3rem] items-center justify-center cursor-pointer hover:bg-gray-300 rounded-[0.6rem] transition-colors duration-150 ease-in-out"
          >
            <img src={settingIcon} width="full" height="full" alt="Setting" />
          </button>
        </div>

        <button
          type="button"
          className="flex w-[25.6rem] items-center gap-[0.8rem] hover:bg-gray-300 rounded-[0.6rem] cursor-pointer transition-colors duration-150 ease-in-out"
        >
          <img
            src={bellIcon}
            className="w-[2.4rem] h-[2.4rem] hover:text-primary-blue"
            alt="Bell"
          />
          <span className="font-small-r text-gray-600 letter-spacing-[-0.028rem]">알림</span>
        </button>

        <div className="flex w-[25.6rem] flex-col items-start self-stretch">
          {/* 첫 번째 드롭다운: 워크스페이스 전체 팀 */}
          <DropdownMenu
            headerTitle="워크스페이스 전체 팀"
            initialOpen={true}
            headerHasToggleIcon={false}
          >
            <div className="flex flex-col">
              <DropdownMenu
                headerTitle="Workspace"
                initialOpen={true}
                headerTeamIcon={
                  <img src={vecocirclenavy} className="w-[2.4rem] h-[2.4rem]" alt="Workspace" />
                }
                isNested={true}
              >
                <div className="flex flex-col justify-end items-end">
                  <div className="flex w-[22.6rem] flex-col justify-center items-flex-start gap-[1.6rem] mb-[1.6rem]">
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
                  </div>
                </div>
              </DropdownMenu>
            </div>
          </DropdownMenu>
        </div>
        {/* 두 번째 드롭다운: 나의 팀 (내부에 드롭다운 또 포함) */}
        <div className="flex w-[25.6rem] flex-col items-start self-stretch">
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
              <div className="flex flex-col justify-end items-end">
                <div className="flex w-[22.6rem] flex-col justify-center items-start gap-[1.6rem] mb-[1.6rem]">
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
                </div>
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
              <div className="flex flex-col justify-end items-end">
                <div className="flex w-[22.6rem] flex-col justify-center items-start gap-[1.6rem] mb-[1.6rem]">
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
                </div>
              </div>
            </DropdownMenu>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
