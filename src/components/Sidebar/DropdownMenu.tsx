// src/components/DropdownMenu.jsx
import React, { useState } from 'react';
import DropdownHeader from './DropdownHeader';

interface DropdownMenuProps {
  headerTitle: string;
  initialOpen?: boolean;
  children: React.ReactNode;
  headerTeamIcon?: React.ReactNode;
  headerHasToggleIcon?: boolean;
  isNested?: boolean;
  dragHandle?: React.ReactNode;
}

const DropdownMenu = ({
  headerTitle,
  initialOpen = false,
  children,
  headerTeamIcon,
  headerHasToggleIcon = true,
  isNested = false,
  dragHandle,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex flex-col w-full`}>
      {/* headerTitle ex: 작업실, 나의 팀, Team1 */}
      {headerTitle && (
        <DropdownHeader
          title={headerTitle}
          isOpen={isOpen}
          onToggle={handleToggle}
          teamIcon={headerTeamIcon}
          hasToggleIcon={headerHasToggleIcon}
          isNested={isNested}
          dragHandle={dragHandle}
        />
      )}

      {isOpen && <div className="">{children}</div>}
    </div>
  );
};

export default DropdownMenu;
