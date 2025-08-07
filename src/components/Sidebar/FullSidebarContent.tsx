import DropdownMenu from './DropdownMenu';
import SidebarItem from './SidebarItem';
import vecocirclenavy from '../../assets/logos/veco-circle-logo-bg-navy.svg';
import settingIcon from '../../assets/icons/setting.svg';
import bellIcon from '../../assets/icons/bell.svg';
import bellHoverIcon from '../../assets/icons/bell-hover.svg';
import goalIcon from '../../assets/icons/goal.svg';
import goalHoverIcon from '../../assets/icons/goal-hover.svg';
import issueIcon from '../../assets/icons/issue.svg';
import issueHoverIcon from '../../assets/icons/issue-hover.svg';
import externalIcon from '../../assets/icons/external.svg';
import externalHoverIcon from '../../assets/icons/external-hover.svg';
import collapseIcon from '../../assets/icons/collapse.svg';
import { useNavigate } from 'react-router-dom';
import hamburgerIcon from '../../assets/icons/hamburger.svg';
import SortableDropdownList from './SortableDropdownList';
import vecocirclewhite from '../../assets/logos/veco-circle-logo-bg-white.svg';
import { usePatchWorkspaceTeams } from '../../apis/setting/usePatchWorkspaceTeams';
import type { Team } from '../../types/setting';
import type { WorkspaceResponse } from '../../types/setting';

interface FullSidebarContentProps {
  setExpanded: (value: boolean) => void;
  teams: Team[];
  isLoading: boolean;
  workspaceProfile: WorkspaceResponse;
}

const FullSidebarContent = ({
  setExpanded,
  teams,
  isLoading,
  workspaceProfile,
}: FullSidebarContentProps) => {
  const navigate = useNavigate();
  const { mutate: patchWorkspaceTeams } = usePatchWorkspaceTeams();

  return (
    <div className="w-full p-[3.2rem] pe-[2rem] min-h-screen">
      <div className="flex flex-col items-start gap-[3.2rem] self-stretch">
        <div className="flex justify-between items-start self-stretch">
          <button
            type="button"
            className="flex items-center gap-[0.8rem] cursor-pointer"
            onClick={() =>
              navigate(`/workspace/default/team/${workspaceProfile.defaultTeamId}/issue`)
            }
          >
            <img
              src={workspaceProfile?.workspaceImageUrl || vecocirclenavy}
              className="w-[3.2rem] h-[3.2rem]"
              alt="Workspace"
            />
            <span className="font-body-b text-gray-600 letter-spacing-[-0.032rem]">
              {workspaceProfile?.workspaceName}
            </span>
          </button>
          <div className="flex items-center gap-[1.6rem]">
            <button
              type="button"
              className="flex w-[2.4rem] h-[2.4rem] items-center justify-center cursor-pointer"
              onClick={() => setExpanded(false)}
            >
              <img src={collapseIcon} alt="collapse" />
            </button>
            <button
              type="button"
              className="flex w-[3.2rem] h-[3.2rem] p-[0.3rem] items-center justify-center cursor-pointer"
              onClick={() => navigate('/workspace/setting/ws-profile')}
            >
              <img src={settingIcon} width="full" height="full" alt="Setting" />
            </button>
          </div>
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
                headerTitle={workspaceProfile?.workspaceName || ''}
                initialOpen={true}
                headerTeamIcon={workspaceProfile?.workspaceImageUrl || vecocirclenavy}
                isNested={true}
              >
                <div className="flex flex-col justify-center items-flex-start gap-[1.6rem] pl-[3rem] pb-[1.6rem]">
                  <SidebarItem
                    defaultIcon={goalIcon}
                    hoverIcon={goalHoverIcon}
                    label="목표"
                    onClick={() => {
                      navigate(`/workspace/default/team/${workspaceProfile.defaultTeamId}/goal`);
                    }}
                    onAddClick={() => {
                      navigate(
                        `/workspace/default/team/${workspaceProfile.defaultTeamId}/goal/:goalId`
                      );
                    }}
                  />
                  <SidebarItem
                    defaultIcon={issueIcon}
                    hoverIcon={issueHoverIcon}
                    label="이슈"
                    onClick={() => {
                      navigate(`/workspace/default/team/${workspaceProfile.defaultTeamId}/issue`);
                    }}
                    onAddClick={() => {
                      navigate(
                        `/workspace/default/team/${workspaceProfile.defaultTeamId}/issue/:issueId`
                      );
                    }}
                  />
                  <SidebarItem
                    defaultIcon={externalIcon}
                    hoverIcon={externalHoverIcon}
                    label="외부"
                    onClick={() => {
                      navigate(`/workspace/default/team/${workspaceProfile.defaultTeamId}/ext`);
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
            {/* Team 드롭다운 (내부 드롭다운) */}
            {isLoading ? null : teams.length === 0 ? (
              <div className="text-gray-400 font-xsmall-r px-[3rem] pb-[1.6rem]">
                등록된 팀이 없습니다.
              </div>
            ) : (
              <SortableDropdownList
                items={teams}
                renderContent={(team, { listeners, attributes }, isOverlay) => (
                  <DropdownMenu
                    headerTitle={team?.teamName}
                    initialOpen={!isOverlay}
                    headerTeamIcon={team?.teamImageUrl || vecocirclewhite}
                    isNested={true}
                    dragHandle={
                      <button {...attributes} {...listeners} type="button" className="cursor-grab">
                        <img src={hamburgerIcon} className="w-[2.4rem] h-[2.4rem]" alt="Drag" />
                      </button>
                    }
                  >
                    {!isOverlay && (
                      <div className="flex flex-col justify-center items-start gap-[1.6rem] pl-[3rem] pb-[1.6rem]">
                        <SidebarItem
                          defaultIcon={goalIcon}
                          hoverIcon={goalHoverIcon}
                          label="목표"
                          onClick={() => {
                            navigate(`/workspace/team/${team.teamId}/goal`);
                          }}
                          onAddClick={() => {
                            navigate(`/workspace/team/${team.teamId}/goal/:goalId`);
                          }}
                        />
                        <SidebarItem
                          defaultIcon={issueIcon}
                          hoverIcon={issueHoverIcon}
                          label="이슈"
                          onClick={() => {
                            navigate(`/workspace/team/${team.teamId}/issue`);
                          }}
                          onAddClick={() => {
                            navigate(`/workspace/team/${team.teamId}/issue/:issueId`);
                          }}
                        />
                        <SidebarItem
                          defaultIcon={externalIcon}
                          hoverIcon={externalHoverIcon}
                          label="외부"
                          onClick={() => {
                            navigate(`/workspace/team/${team.teamId}/ext`);
                          }}
                        />
                      </div>
                    )}
                  </DropdownMenu>
                )}
                onSorted={(newList: Team[]) => {
                  const teamIdList = newList.map((item: Team) => item.teamId);
                  teamIdList.unshift(workspaceProfile.defaultTeamId);
                  patchWorkspaceTeams({ teamIdList });
                }}
              />
            )}
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default FullSidebarContent;
