import { GoalItem } from '../../components/ListView/GoalItem';
import PlusIcon from '../../assets/icons/plus.svg';
import { useMemo, useState } from 'react';
import { PRIORITY_LABELS, STATUS_LABELS, type ItemFilter } from '../../types/listItem';
import GroupTypeIcon from '../../components/ListView/GroupTypeIcon';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import useCheckItems from '../../hooks/useCheckItems';
import ListViewToolbar from '../../components/ListView/ListViewToolbar';
import { useModalActions, useModalInfo } from '../../hooks/useModal';
import Modal from '../../components/Modal/Modal';
import {
  dummyStatusGoalGroups,
  dummyPriorityGoalGroups,
  dummyManagerGoalGroups,
} from '../../types/testDummy';
import type { GoalFilter, GroupedGoal } from '../../types/goal';
import { getSortedGrouped } from '../../utils/listGroupSortUtils';
import WorkspaceIcon from '../../components/ListView/WorkspaceIcon';
import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FILTER_OPTIONS: ItemFilter[] = ['상태', '우선순위', '담당자'] as const;

const WorkspaceGoal = () => {
  const navigate = useNavigate();
  const { isOpen, content } = useDropdownInfo();
  const { openDropdown, closeDropdown } = useDropdownActions();
  const [filter, setFilter] = useState<ItemFilter>('상태');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(':goalId');
  };

  // filter 변경마다 다른 데이터 선택 -> 추후 새로운 데이터 불러오도록
  const dummyGoalGroups = useMemo<GoalFilter[]>(() => {
    switch (filter) {
      case '상태':
        return dummyStatusGoalGroups;
      case '우선순위':
        return dummyPriorityGoalGroups;
      case '담당자':
        return dummyManagerGoalGroups;
      default:
        return [];
    }
  }, [filter]);

  const allGoalsFlat = dummyGoalGroups.flatMap((g) => g.goals);

  const {
    checkedIds: checkItems,
    isAllChecked,
    handleCheck,
    handleSelectAll,
    setCheckedIds,
  } = useCheckItems(allGoalsFlat, 'id');

  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const { isOpen: isModalOpen, content: modalContent } = useModalInfo();
  const { openModal } = useModalActions();
  const handleDeleteClick = () => {
    if (isDeleteMode && checkItems.length > 0) {
      openModal({
        name: `${checkItems.length}개의 목표를 삭제하시겠습니까?`,
      });
    } else {
      setIsDeleteMode((prev) => !prev);
      if (!isDeleteMode) setCheckedIds([]);
    }
  };

  const grouped: GroupedGoal[] = dummyGoalGroups.map((g) => ({
    key: g.filterName,
    items: g.goals,
  }));

  const sortedGrouped = getSortedGrouped(filter, grouped);
  const isEmpty = grouped.every(({ items }) => items.length === 0);

  return (
    <>
      <div className="flex flex-1 flex-col gap-[3.2rem] p-[3.2rem]">
        {/* 워크스페이스 아이콘, 워크스페이스명, props로 요소 전달 가능 */}
        <WorkspaceIcon />
        <ListViewToolbar
          filter={filter}
          isDeleteMode={isDeleteMode}
          isAllChecked={isAllChecked}
          showSelectAll={grouped.some(({ items }) => items.length > 0)}
          filterOptions={FILTER_OPTIONS}
          onFilterClick={() => openDropdown({ name: 'filter' })}
          onFilterSelect={(option) => {
            setFilter(option as ItemFilter);
            closeDropdown();
          }}
          onDeleteClick={handleDeleteClick}
          onSelectAllChange={handleSelectAll}
          dropdownProps={{ isOpen, content, closeDropdown }}
        />
        {isModalOpen && modalContent && <Modal subtitle={modalContent.name} />}
        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="font-body-r">목표를 생성하세요</div>
          </div>
        ) : (
          /* 리스트뷰 */
          <div className="flex flex-col gap-[4.8rem]">
            {sortedGrouped.map(({ key, items }) =>
              /* 해당 요소 존재할 때만 생성 */
              items.length > 0 ? (
                <div key={key}>
                  <div className="flex justify-between pb-[1.6em]">
                    <div
                      className={`flex font-title-sub-b h-[2.8rem] overflow-hidden ${filter === '우선순위' ? 'items-end' : 'items-center'}`}
                    >
                      <GroupTypeIcon
                        filter={filter}
                        typeKey={key}
                        profileImghUrl={filter === '담당자' ? '' : undefined}
                      />
                      {/* 유형명 */}
                      <div>
                        {filter === '상태'
                          ? STATUS_LABELS[key as keyof typeof STATUS_LABELS] || key
                          : filter === '우선순위'
                            ? PRIORITY_LABELS[key as keyof typeof PRIORITY_LABELS] || key
                            : key}
                      </div>
                      <div className="text-gray-500 ml-[0.8rem]">{items.length}</div>
                    </div>
                    {/* 추가 버튼 */}
                    <img
                      src={PlusIcon}
                      className="inline-block w-[2.4rem] h-[2.4rem]"
                      alt=""
                      onClick={handleClick}
                    />
                  </div>
                  {/* 각 유형 별 요소 */}
                  {items.map((goal) => (
                    <GoalItem
                      key={goal.id}
                      {...goal}
                      showCheckbox={isDeleteMode}
                      checked={checkItems.includes(goal.id)}
                      onCheckChange={(checked) => handleCheck(goal.id, checked)}
                      filter={filter}
                    />
                  ))}
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default WorkspaceGoal;
