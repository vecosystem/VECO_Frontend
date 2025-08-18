import IcCheck from '../../assets/icons/check.svg';
import IcDownArrow from '../../assets/icons/down-arrow.svg';
import useDropdownRef from '../../hooks/useDropdownRef';
import { useCallback } from 'react';

interface MultiSelectDropdownProps {
  defaultValue?: string; // 상단 고정 텍스트(있으면 헤더 렌더)
  options: string[]; // 옵션 목록
  selected: string[]; // 현재 선택 상태
  onChangeSelected: (values: string[]) => void; // 선택 변경 시 전체 배열 반환
  onClose: () => void; // 바깥 클릭 시 닫힘
  className?: string;
}

const MultiSelectDropdown = ({
  defaultValue,
  options,
  selected,
  onChangeSelected,
  onClose,
  className,
}: MultiSelectDropdownProps) => {
  const dropdownRef = useDropdownRef(onClose);

  // handleToggle: 옵션을 클릭했을 때 해당 옵션의 선택 상태를 토글(선택<->해제)하는 함수
  const handleToggle = useCallback(
    (option: string) => {
      const set = new Set(selected);
      set.has(option) ? set.delete(option) : set.add(option); // 클릭한 옵션이 이미 selected[]에 있다면 선택 해제, 없다면 선택 추가
      onChangeSelected(Array.from(set)); // 부모 컴포넌트에 옵션 선택 변경 알림
    },
    [selected, onChangeSelected]
  );

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      style={{
        boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.15)',
        maxHeight: 'calc(2.7rem * 5 + 4.8rem)', // 옵션 5개 + 헤더 높이(있으면)
        overflowY: 'auto',
      }}
      className={`absolute z-30 top-0 flex flex-col w-auto min-w-[11.6rem] max-w-[27.4rem]
      border border-gray-400 bg-white rounded-[0.4rem] ${className ?? ''}`}
    >
      {defaultValue && (
        <div className="flex border-b border-gray-200 justify-between items-center py-[0.4rem] ps-[1.2rem] pe-[0.8rem]">
          <span className="font-xsmall-r text-gray-600 me-[0.4rem]">{defaultValue}</span>
          <img src={IcDownArrow} alt={defaultValue} />
        </div>
      )}

      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <div
            key={option}
            onClick={() => handleToggle(option)}
            className={`flex w-full py-[0.75rem] px-[1.2rem]
              ${isSelected ? 'bg-gray-200' : ''}`}
          >
            <span className="font-xsmall-r text-gray-600 me-[0.4rem] truncate">{option}</span>
            <img
              className={`opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}
              src={IcCheck}
              alt="selected"
            />
          </div>
        );
      })}
    </div>
  );
};

export default MultiSelectDropdown;
