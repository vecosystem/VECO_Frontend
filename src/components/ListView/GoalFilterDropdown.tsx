import { useRef, useState } from 'react';
import FilterIcon from '../../assets/icons/filter.svg';
import { FilterDropdown } from './FilterDropdown'; // 경로는 상황에 맞게 수정
import type { FilterOption } from './FilterDropdown';

// 옵션 정의
const filterOptions: readonly FilterOption[] = [
  { type: 'status', label: '상태' },
  { type: 'priority', label: '우선순위' },
  { type: 'manage', label: '담당자' },
] as const;

type FilterType = (typeof filterOptions)[number]['type'];

interface GoalFilterDropdownProps {
  value: FilterType;
  onChange: (type: FilterType) => void;
}

export const GoalFilterDropdown = ({ value, onChange }: GoalFilterDropdownProps) => {
  const [show, setShow] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex gap-[0.8rem] items-center cursor-pointer relative"
      onClick={() => setShow((prev) => !prev)}
      ref={filterRef}
    >
      <img src={FilterIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="필터" />
      <span className="font-body-r">필터</span>
      <FilterDropdown
        options={filterOptions}
        value={value}
        onChange={onChange}
        show={show}
        setShow={setShow}
        buttonRef={filterRef}
      />
    </div>
  );
};
