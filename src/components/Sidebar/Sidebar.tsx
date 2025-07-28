import { useState } from 'react';
import MiniSidebarContent from './MiniSidebarContent';
import FullSidebarContent from './FullSidebarContent';
import vecocirclewhite from '../../assets/logos/veco-circle-logo-bg-white.svg';
import clsx from 'clsx';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const teams = [
    { id: 'team1', name: 'Team1', icon: <img src={vecocirclewhite} alt="team1" /> },
    { id: 'team2', name: 'Team2', icon: <img src={vecocirclewhite} alt="team2" /> },
  ];

  return (
    <div
      className={clsx(
        'bg-gray-200 transition-all duration-300 ease-in-out',
        isExpanded ? 'w-[30.8rem]' : 'w-[12.8rem]',
        'h-screen flex flex-col'
      )}
    >
      {/* 💡 스크롤과 커스텀 스크롤바는 이 div에서 담당 */}
      <div className="relative flex-1">
        {/* Full Sidebar */}
        <div
          className={clsx(
            'absolute inset-0 h-full w-full transition-opacity duration-300',
            isExpanded ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          )}
        >
          <div className="h-full overflow-y-auto sidebar-scroll">
            <FullSidebarContent setExpanded={setIsExpanded} teams={teams} />
          </div>
        </div>

        {/* Mini Sidebar */}
        <div
          className={clsx(
            'absolute inset-0 h-full w-full transition-opacity duration-300',
            !isExpanded ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
          )}
        >
          <div className="h-full overflow-y-auto sidebar-scroll">
            <MiniSidebarContent setExpanded={setIsExpanded} teams={teams} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
