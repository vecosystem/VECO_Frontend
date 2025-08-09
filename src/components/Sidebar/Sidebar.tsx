import MiniSidebarContent from './MiniSidebarContent';
import FullSidebarContent from './FullSidebarContent';
import clsx from 'clsx';
import { useGetWorkspaceTeams } from '../../apis/setting/useGetWorkspaceTeams';
import type { Team } from '../../types/setting';
import { useGetWorkspaceProfile } from '../../apis/setting/useGetWorkspaceProfile';
import { useUIStore } from '../../stores/ui';

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { data: workspaceProfile } = useGetWorkspaceProfile();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetWorkspaceTeams();

  const defaultTeam: Team | null = data ? data.pages.flatMap((page) => page.teamList)[0] : null;
  const myTeams: Team[] = data ? data.pages.flatMap((page) => page.teamList).slice(1) : [];

  return (
    <div
      className={clsx(
        'bg-gray-200 transition-all duration-300 ease-in-out',
        sidebarOpen ? 'w-[30.8rem]' : 'w-[12.8rem]',
        'h-screen flex flex-col'
      )}
    >
      {/* 💡 스크롤과 커스텀 스크롤바는 이 div에서 담당 */}
      <div className="relative flex-1">
        {/* Full Sidebar */}
        <div
          className={clsx(
            'absolute inset-0 h-full w-full transition-opacity duration-300',
            sidebarOpen ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          )}
        >
          <div className="h-full overflow-y-auto sidebar-scroll">
            <FullSidebarContent
              setExpanded={toggleSidebar}
              defaultTeam={defaultTeam!}
              myTeams={myTeams}
              workspaceProfile={workspaceProfile!}
              isLoading={isLoading}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </div>
        </div>

        {/* Mini Sidebar */}
        <div
          className={clsx(
            'absolute inset-0 h-full w-full transition-opacity duration-300',
            !sidebarOpen ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          )}
        >
          <div className="h-full overflow-y-auto sidebar-scroll">
            <MiniSidebarContent
              setExpanded={toggleSidebar}
              defaultTeam={defaultTeam!}
              myTeams={myTeams}
              workspaceProfile={workspaceProfile!}
              isLoading={isLoading}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
