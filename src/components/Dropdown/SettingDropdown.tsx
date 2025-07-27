import { useDropdownActions } from '../../hooks/useDropdown.ts';
import useDropdownRef from '../../hooks/useDropdownRef.ts';
import IcRightArrow from '../../assets/icons/right-arrow.svg';
import React from 'react';

interface SettingDropdownProps {
  options: { value: string; onClick: () => void; icon?: React.ReactNode }[];
}

const SettingDropdown = ({ options }: SettingDropdownProps) => {
  const { closeDropdown } = useDropdownActions();
  const dropdownRef = useDropdownRef(closeDropdown);

  return (
    <div
      ref={dropdownRef}
      style={{ boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)' }}
      className={`absolute z-30 top-0 left-0 flex flex-col w-[11.6rem]
      border border-gray-400 bg-white rounded-[0.4rem]`}
    >
      {options.map((option) => (
        <div
          key={option.value}
          className={`flex justify-between hover:bg-gray-200 py-[0.75rem] ps-[1.2rem] pe-[0.8rem] rounded-[0.4rem] cursor-pointer`}
          onClick={() => {
            option.onClick();
            closeDropdown();
          }}
        >
          <span className={`font-xsmall-r text-gray-default`}>{option.value}</span>
          {option.icon ? option.icon : <img src={IcRightArrow} alt={option.value} />}
        </div>
      ))}
    </div>
  );
};

export default SettingDropdown;
