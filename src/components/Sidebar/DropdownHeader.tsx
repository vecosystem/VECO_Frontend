// src/components/DropdownHeader.jsx
import React from 'react';
import DropdownIcon from '../../assets/icons/dropdown.svg?react';

interface DropdownHeaderProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  hasToggleIcon?: boolean;
  customLeftIcon?: React.ReactNode;
}

const DropdownHeader = ({
  title,
  isOpen,
  onToggle,
  hasToggleIcon = true,
  customLeftIcon,
}: DropdownHeaderProps) => {
  return (
    <div
      className="flex items-center gap-2 py-2 px-2 cursor-pointer hover:bg-gray-100 rounded-md"
      onClick={onToggle}
    >
      {customLeftIcon && <span className="text-gray-600">{customLeftIcon}</span>}
      <span className="font-semibold text-gray-800">{title}</span>
      {hasToggleIcon && (
        <span className="ml-auto text-gray-500">
          {isOpen ? (
            <DropdownIcon className="h-4 w-4 rotate-180" />
          ) : (
            <DropdownIcon className="h-4 w-4" />
          )}
        </span>
      )}
    </div>
  );
};

export default DropdownHeader;
