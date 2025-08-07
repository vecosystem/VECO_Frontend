// src/components/DropdownHeader.jsx
import React from 'react';
import dropdownIcon from '../../assets/icons/dropdown.svg';

interface DropdownHeaderProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  hasToggleIcon?: boolean;
  teamIcon?: string;
  isNested?: boolean;
  dragHandle?: React.ReactNode;
}

const DropdownHeader = ({
  title,
  isOpen,
  onToggle,
  hasToggleIcon = true,
  teamIcon,
  isNested = false,
  dragHandle,
}: DropdownHeaderProps) => {
  return (
    <div
      className={`flex w-full items-center justify-between cursor-pointer mb-[1.6rem] group`}
      onClick={onToggle}
    >
      <div className="flex items-center gap-[0.8rem]">
        {/* teamIcon ex: 팀 이미지 */}
        {teamIcon && <img src={teamIcon} className="w-[2.4rem] h-[2.4rem]" alt="Team" />}

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
            <span className="h-[2.4rem] w-[2.4rem]">
              {isOpen ? (
                <img src={dropdownIcon} alt="Dropdown" />
              ) : (
                <img src={dropdownIcon} alt="Dropdown" className="rotate-270" />
              )}
            </span>
          )}
        </div>
      </div>
      {dragHandle && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {dragHandle}
        </div>
      )}
    </div>
  );
};

export default DropdownHeader;
