import IcRightArrow from '../../assets/icons/right-arrow.svg';
import { useCallback } from 'react';
import useDropdownRef from '../../hooks/useDropdownRef.ts';
import IcDownArrow from '../../assets/icons/down-arrow.svg';

interface ArrowDropdownProps {
  defaultValue: string; // 최상단 고정 텍스트
  options: string[]; // 드롭다운에 표시할 옵션들
  onSelect: (value: string) => void;
  onClose: () => void;
  className?: string;
}

const ArrowDropdown = ({
  defaultValue,
  options,
  onSelect,
  onClose,
  className,
}: ArrowDropdownProps) => {
  const dropdownRef = useDropdownRef(onClose);
  const handleSelect = useCallback(
    (option: string) => {
      onSelect(option);
      onClose();
    },
    [onSelect, onClose]
  );

  return (
    <div
      ref={dropdownRef}
      style={{ boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)' }}
      className={`absolute z-30 top-0 left-0 flex flex-col w-[27.4rem]
      border border-gray-400 bg-white rounded-[0.4rem] ${className}`}
    >
      <div
        className={`flex border-b border-gray-200 justify-between items-center py-[0.4rem] ps-[1.2rem] pe-[0.8rem]`}
        onClick={onClose}
      >
        <span className={`font-xsmall-r text-gray-600 me-[0.4rem]`}>{defaultValue}</span>
        <img src={IcDownArrow} alt={defaultValue} />
      </div>
      {options.map((option) => (
        <div
          key={option}
          className={`flex justify-between py-[0.75rem] px-[1.2rem]`}
          onClick={() => handleSelect(option)}
        >
          <span className={`font-xsmall-r text-gray-600 me-[0.4rem] truncate`}>{option}</span>
          <img src={IcRightArrow} alt={option} />
        </div>
      ))}
    </div>
  );
};

export default ArrowDropdown;
