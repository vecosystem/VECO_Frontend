import expandIcon from '../../assets/icons/expand.svg';
import { useNavigate } from 'react-router-dom';
import vecocirclenavy from '../../assets/logos/veco-circle-logo-bg-navy.svg';
import bellIcon from '../../assets/icons/bell.svg';
import bellHoverIcon from '../../assets/icons/bell-hover.svg';
import goalIcon from '../../assets/icons/goal.svg';
import goalHoverIcon from '../../assets/icons/goal-hover.svg';
import issueIcon from '../../assets/icons/issue.svg';
import issueHoverIcon from '../../assets/icons/issue-hover.svg';
import externalIcon from '../../assets/icons/external.svg';
import externalHoverIcon from '../../assets/icons/external-hover.svg';
import DropdownMenu from './DropdownMenu';
import SidebarItem from './SidebarItem';
import SortableDropdownList from './SortableDropdownList';
import type { Team } from '../../types/setting';
import type { WorkspaceResponse } from '../../types/setting';
import vecocirclewhite from '../../assets/logos/veco-circle-logo-bg-white.svg';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface MiniSidebarContentProps {
  toggleSidebar: () => void;
  defaultTeam: Team;
  myTeams: Team[];
  isLoading: boolean;
  workspaceProfile: WorkspaceResponse;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const MiniSidebarContent = ({
  toggleSidebar,
  defaultTeam,
  myTeams,
  isLoading,
  workspaceProfile,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: MiniSidebarContentProps) => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <div className="w-full p-[3.2rem] pe-[2rem] min-h-screen">
      <div className="flex flex-col items-start gap-[3.2rem] self-stretch">
        <div className="flex items-center gap-[1.6rem] self-stretch">
          <button
            type="button"
            className="flex w-[3.2rem] h-[3.2rem] shrink-0 items-center cursor-pointer"
            onClick={() =>
              navigate(`/workspace/default/team/${workspaceProfile?.defaultTeamId}/issue`)
            }
          >
            <img
              src={workspaceProfile?.workspaceImageUrl || vecocirclenavy}
              className="w-full h-full shrink-0 rounded-full object-cover"
              alt="Workspace"
            />
          </button>
          <button
            type="button"
            className="flex w-[2.4rem] h-[2.4rem] shrink-0 items-center justify-center cursor-pointer"
            onClick={toggleSidebar}
          >
            <img src={expandIcon} className="w-full h-full shrink-0" alt="expand" />
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
        </button>

        <div className="flex flex-col items-start self-stretch">
          {/* 첫 번째 드롭다운: 워크스페이스 기본 팀 */}
          <DropdownMenu headerTitle="기본" initialOpen={true}>
            <div className="flex flex-col">
              {isLoading ? null : (
                <DropdownMenu
                  headerTitle=""
                  initialOpen={true}
                  headerTeamIcon={defaultTeam?.teamImageUrl || vecocirclenavy}
                  isNested={true}
                >
                  <div className="flex flex-col justify-center items-flex-start gap-[1.6rem] pb-[1.6rem]">
                    <SidebarItem
                      defaultIcon={goalIcon}
                      hoverIcon={goalHoverIcon}
                      label=""
                      onClick={() => {
                        navigate(`/workspace/default/team/${defaultTeam.teamId}/goal`);
                      }}
                      onAddClick={() => {
                        navigate(
                          `/workspace/default/team/${defaultTeam.teamId}/goal/detail/create`
                        );
                      }}
                    />
                    <SidebarItem
                      defaultIcon={issueIcon}
                      hoverIcon={issueHoverIcon}
                      label=""
                      onClick={() => {
                        navigate(`/workspace/default/team/${defaultTeam.teamId}/issue`);
                      }}
                      onAddClick={() => {
                        navigate(
                          `/workspace/default/team/${defaultTeam.teamId}/issue/detail/create`
                        );
                      }}
                    />
                    <SidebarItem
                      defaultIcon={externalIcon}
                      hoverIcon={externalHoverIcon}
                      label=""
                      onClick={() => {
                        navigate(`/workspace/default/team/${defaultTeam.teamId}/ext`);
                      }}
                    />
                  </div>
                </DropdownMenu>
              )}
            </div>
          </DropdownMenu>
        </div>
        {/* 두 번째 드롭다운: 나의 팀 (내부에 드롭다운 또 포함) */}
        <div className="flex flex-col items-start self-stretch">
          <DropdownMenu headerTitle="나의" initialOpen={true}>
            {/* Team1 드롭다운 (내부 드롭다운) */}
            {isLoading ? null : myTeams.length === 0 ? (
              <div className="text-gray-400 font-xsmall-r px-[3rem] pb-[1.6rem]">
                등록된 팀이 없습니다.
              </div>
            ) : (
              <>
                <SortableDropdownList
                  items={myTeams}
                  renderContent={(team, {}, isOverlay) => (
                    <DropdownMenu
                      headerTitle=""
                      initialOpen={!isOverlay}
                      headerTeamIcon={team.teamImageUrl || vecocirclewhite}
                      isNested={true}
                    >
                      {!isOverlay && (
                        <div className="flex flex-col justify-center items-start gap-[1.6rem] pb-[1.6rem]">
                          <SidebarItem
                            defaultIcon={goalIcon}
                            hoverIcon={goalHoverIcon}
                            label=""
                            onClick={() => {
                              navigate(`/workspace/team/${team.teamId}/goal`);
                            }}
                            onAddClick={() => {
                              navigate(`/workspace/team/${team.teamId}/goal/detail/create`);
                            }}
                          />
                          <SidebarItem
                            defaultIcon={issueIcon}
                            hoverIcon={issueHoverIcon}
                            label=""
                            onClick={() => {
                              navigate(`/workspace/team/${team.teamId}/issue`);
                            }}
                            onAddClick={() => {
                              navigate(`/workspace/team/${team.teamId}/issue/detail/create`);
                            }}
                          />
                          <SidebarItem
                            defaultIcon={externalIcon}
                            hoverIcon={externalHoverIcon}
                            label=""
                            onClick={() => {
                              navigate(`/workspace/team/${team.teamId}/ext`);
                            }}
                          />
                        </div>
                      )}
                    </DropdownMenu>
                  )}
                  onSorted={(newList: any) => console.log(newList)}
                />
                <div ref={ref} className="h-[1rem]" />
              </>
            )}
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default MiniSidebarContent;
