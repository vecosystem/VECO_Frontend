import IcCheck from '../../assets/icons/check.svg';
import IcDownArrow from '../../assets/icons/down-arrow.svg';
import useDropdownRef from '../../hooks/useDropdownRef.ts';
import { useCallback } from 'react';

interface DropdownProps {
  value?: string; // 현재 선택된 값
  defaultValue?: string; // 최상단 고정 텍스트
  options: string[]; // 드롭다운에 표시할 옵션들
  onSelect: (value: string) => void;
  onClose: () => void;
  className?: string;
}

const Dropdown = ({
  value,
  defaultValue,
  options,
  onSelect,
  onClose,
  className,
}: DropdownProps) => {
  const dropdownRef = useDropdownRef(onClose);

  const handleSelect = useCallback(
    (option: string) => {
      defaultValue && onSelect(option);
      onClose();
    },
    [onSelect, onClose]
  );

  return (
    <div
      ref={dropdownRef}
      style={{ boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)' }}
      className={`absolute z-30 top-0 right-0 flex flex-col w-auto min-w-[11.6rem] max-w-[27.4rem]
      border border-gray-400 bg-white rounded-[0.4rem] ${className}`}
    >
      {defaultValue && (
        <div
          className={`flex border-b border-gray-200 justify-between items-center py-[0.4rem] ps-[1.2rem] pe-[0.8rem]`}
          onClick={() => onClose()}
        >
          <span className={`font-xsmall-r text-gray-600 me-[0.4rem]`}>{defaultValue}</span>
          <img src={IcDownArrow} alt={defaultValue} />
        </div>
      )}
      {options.map((option) => (
        <div
          key={option}
          className={`flex py-[0.75rem] px-[1.2rem] ${value === option ? 'bg-gray-200' : ''}`}
          onClick={() => handleSelect(option)}
        >
          <span className={`font-xsmall-r text-gray-600 me-[0.4rem] truncate`}>{option}</span>
          <img
            className={`opacity-0 ${value === option ? 'opacity-100' : 'opacity-0'}`}
            src={IcCheck}
            alt={option}
          />
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
