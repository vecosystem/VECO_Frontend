// src/components/DropdownMenu.jsx
import React, { useState } from 'react';
import DropdownHeader from './DropdownHeader';
import SidebarItem from './SidebarItem';

interface DropdownMenuProps {
  headerTitle: string;
  initialOpen?: boolean;
  children: React.ReactNode;
  headerCustomLeftIcon?: React.ReactNode;
  headerHasToggleIcon?: boolean;
  isNested?: boolean;
}

const DropdownMenu = ({
  headerTitle,
  initialOpen = false,
  children,
  headerCustomLeftIcon,
  headerHasToggleIcon = true,
  isNested = false, // 중첩된 드롭다운인지 여부
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const containerPaddingClass = isNested ? 'pl-4' : 'pl-0'; // 중첩될 때 들여쓰기

  return (
    <div className={`w-full ${containerPaddingClass}`}>
      {headerTitle && (
        <DropdownHeader
          title={headerTitle}
          isOpen={isOpen}
          onToggle={handleToggle}
          customLeftIcon={headerCustomLeftIcon}
          hasToggleIcon={headerHasToggleIcon}
        />
      )}

      {isOpen && <div className="mt-1">{children}</div>}
    </div>
  );
};

export default DropdownMenu;
