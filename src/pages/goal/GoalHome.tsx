import { GoalItem } from '../../components/ListView/GoalItem';
import BoxIcon from '../../assets/icons/box.svg';
import ListIcon from '../../assets/icons/list.svg';
import FilterIcon from '../../assets/icons/filter.svg';
import TrashIcon from '../../assets/icons/trash-black.svg';
import PlusIcon from '../../assets/icons/plus.svg';
import { useEffect, useRef, useState } from 'react';
import { FilterDropdown } from '../../components/ListView/FilterDropdown';
import type { GoalItemProps } from '../../types/listItem';

const dummyGoals: Partial<GoalItemProps>[] = [
  {
    goalId: '1',
    title: 'API 연동',
    status: '진행중',
    priority: '높음',
    deadline: '2025-07-01',
    manage: '김선화',
  },
];

// 필터 옵션
const filterOptions = [
  { type: 'status', label: '상태' },
  { type: 'priority', label: '우선순위' },
  { type: 'manage', label: '담당자' },
] as const;

type FilterType = (typeof filterOptions)[number]['type'];

const statusList = ['없음', '진행중', '해야할 일', '완료', '검토', '삭제'] as const;
const priorityList = ['없음', '긴급', '높음', '보통', '낮음'] as const;
function getManagers(goals: typeof dummyGoals) {
  const set = new Set(goals.map((g) => g.manage));
  return ['없음', ...Array.from(set)];
}

const GoalHome = () => {
  const [filter, setFilter] = useState<'status' | 'priority' | 'manage'>('status');
  const [showDropdown, setShowDropdown] = useState(false);

  // 드롭다운 외부 클릭 시 닫기
  const filterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showDropdown) return;
    const handleClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showDropdown]);

  // 그룹핑
  const groupKeys =
    filter === 'status'
      ? statusList
      : filter === 'priority'
        ? priorityList
        : getManagers(dummyGoals);

  const grouped = groupKeys.map((key) => ({
    key,
    items: dummyGoals.filter((goal) =>
      filter === 'status'
        ? goal.status === key
        : filter === 'priority'
          ? goal.priority === key
          : goal.manage === key
    ),
  }));

  return (
    <>
      <div className="flex flex-col gap-[3.2rem]">
        {/* 팀 아이콘, 팀명 */}
        <div className="flex gap-[1.6rem] items-center">
          <img
            src=""
            className="inline-block w-[3.2rem] h-[3.2rem] rounded-full bg-primary-variant-blue"
          />
          <div className="flex font-title-b">팀명</div>
        </div>

        {/* 필터 선택 */}
        <div className="flex justify-between">
          <div className="flex gap-[0.8rem] items-center">
            <img src={BoxIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
            <img src={ListIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
          </div>
          <div className="flex gap-[2.4rem] items-center">
            {/* 필터영역 */}
            <div
              className="flex gap-[0.8rem] items-center cursor-pointer relative"
              onClick={() => setShowDropdown((v) => !v)}
              ref={filterRef}
            >
              <img src={FilterIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
              <span className="font-body-r">필터 </span>
              {/* 드롭다운 */}
              <FilterDropdown<FilterType>
                options={filterOptions}
                value={filter}
                onChange={setFilter}
                show={showDropdown}
                setShow={setShowDropdown}
                buttonRef={filterRef}
              />
            </div>
            <div className="flex gap-[0.4rem] items-center">
              <img src={TrashIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
              <span className="font-body-r">삭제</span>
            </div>
          </div>
        </div>
        {/* 리스트 뷰 */}
        <div className="flex flex-col gap-[6.4rem]">
          {grouped.map(({ key, items }) =>
            items.length > 0 ? (
              <div key={key}>
                <div className="flex justify-between pb-[3.2rem]">
                  <div className="flex font-title-sub-b gap-[0.8rem]">
                    <div>{key}</div>
                    <div className="text-gray-500">{items.length}</div>
                  </div>
                  <img src={PlusIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
                </div>
                {items.map((goal) => (
                  <GoalItem key={goal.goalId} {...goal} filter={filter} />
                ))}
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
};

export default GoalHome;
