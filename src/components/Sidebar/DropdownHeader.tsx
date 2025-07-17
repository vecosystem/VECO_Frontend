// src/components/DropdownHeader.jsx
import React from 'react';
import dropdownIcon from '../../assets/icons/dropdown.svg';

interface DropdownHeaderProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  hasToggleIcon?: boolean;
  teamIcon?: React.ReactNode;
  isNested?: boolean;
}

const DropdownHeader = ({
  title,
  isOpen,
  onToggle,
  hasToggleIcon = true,
  teamIcon,
  isNested = false,
}: DropdownHeaderProps) => {
  return (
    <div
      className={`flex w-fit items-center gap-[0.8rem] cursor-pointer mb-[1.6rem]`}
      onClick={onToggle}
    >
      {/* teamIcon ex: 팀 이미지 */}
      {teamIcon && <span className="text-gray-600">{teamIcon}</span>}

      <div className="flex justify-center items-center">
        <span
          className={
            !isNested
              ? 'font-xsmall-r letter-spacing-[-0.024rem] text-gray-600'
              : 'font-body-b letter-spacing-[-0.032rem] text-gray-600'
          }
        >
          {title}
        </span>
        {/* hasToggleIcon ex: 팀 드롭다운 토글 아이콘 */}
        {hasToggleIcon && (
          <span className="ml-auto text-gray-500 h-[2.4rem] w-[2.4rem]">
            {isOpen ? (
              <img src={dropdownIcon} alt="Dropdown" />
            ) : (
              <img src={dropdownIcon} alt="Dropdown" className="rotate-270" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default DropdownHeader;
