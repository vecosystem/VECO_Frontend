import MiniSidebarContent from './MiniSidebarContent';
import FullSidebarContent from './FullSidebarContent';
import clsx from 'clsx';
import { useSidebarStore } from '../../stores/useSidebarStore';
import { useGetWorkspaceTeams } from '../../apis/setting/useGetWorkspaceTeams';
import type { Team } from '../../types/setting';
import { useGetWorkspaceProfile } from '../../apis/setting/useGetWorkspaceProfile';

const Sidebar = () => {
  const { isOpen, toggle } = useSidebarStore();
  const { data: workspaceProfile } = useGetWorkspaceProfile();
  const { data, isLoading } = useGetWorkspaceTeams();

  const teams: Team[] = data ? data.pages.flatMap((page) => page.teamList).slice(1) : [];

  return (
    <div
      className={clsx(
        'bg-gray-200 transition-all duration-300 ease-in-out',
        isOpen ? 'w-[30.8rem]' : 'w-[12.8rem]',
        'h-screen flex flex-col'
      )}
    >
      {/* 💡 스크롤과 커스텀 스크롤바는 이 div에서 담당 */}
      <div className="relative flex-1">
        {/* Full Sidebar */}
        <div
          className={clsx(
            'absolute inset-0 h-full w-full transition-opacity duration-300',
            isOpen ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          )}
        >
          <div className="h-full overflow-y-auto sidebar-scroll">
            <FullSidebarContent
              setExpanded={toggle}
              teams={teams}
              isLoading={isLoading}
              workspaceProfile={workspaceProfile!}
            />
          </div>
        </div>

        {/* Mini Sidebar */}
        <div
          className={clsx(
            'absolute inset-0 h-full w-full transition-opacity duration-300',
            !isOpen ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          )}
        >
          <div className="h-full overflow-y-auto sidebar-scroll">
            <MiniSidebarContent
              setExpanded={toggle}
              teams={teams}
              workspaceProfile={workspaceProfile!}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
