import { useState } from 'react';
import MiniSidebarContent from './MiniSidebarContent';
import FullSidebarContent from './FullSidebarContent';
import vecocirclewhite from '../../assets/logos/veco-circle-logo-bg-white.svg';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const teams = [
    { id: 'team1', name: 'Team1', icon: <img src={vecocirclewhite} /> },
    { id: 'team2', name: 'Team2', icon: <img src={vecocirclewhite} /> },
  ];

  return (
    <div className="bg-gray-200 shadow-lg min-h-screen">
      {isExpanded ? (
        <FullSidebarContent setExpanded={setIsExpanded} teams={teams} />
      ) : (
        <MiniSidebarContent setExpanded={setIsExpanded} teams={teams} />
      )}
    </div>
  );
};

export default Sidebar;
