// src/components/DropdownHeader.jsx
import React from 'react';
import dropdownIcon from '../../assets/icons/dropdown.svg';

interface DropdownHeaderProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  hasToggleIcon?: boolean;
  teamIcon?: React.ReactNode;
}

const DropdownHeader = ({
  title,
  isOpen,
  onToggle,
  hasToggleIcon = true,
  teamIcon,
}: DropdownHeaderProps) => {
  return (
    <div
      className="flex items-center gap-2 py-2 px-2 cursor-pointer hover:bg-gray-100 rounded-md"
      onClick={onToggle}
    >
      {/* teamIcon ex: 팀 이미지 */}
      {teamIcon && <span className="text-gray-600">{teamIcon}</span>}
      <span className="font-semibold text-gray-800">{title}</span>
      {/* hasToggleIcon ex: 팀 드롭다운 토글 아이콘 */}
      {hasToggleIcon && (
        <span className="ml-auto text-gray-500">
          {isOpen ? (
            <img src={dropdownIcon} alt="Dropdown" className="h-4 w-4 rotate-180" />
          ) : (
            <img src={dropdownIcon} alt="Dropdown" className="h-4 w-4" />
          )}
        </span>
      )}
    </div>
  );
};

export default DropdownHeader;
