import { useState } from 'react';
import TeamIcon from '../../components/ListView/TeamIcon';
import BellIcon from '../../assets/icons/bell.svg';
import ListViewToolbar from '../../components/ListView/ListViewToolbar';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import { useModalActions, useModalInfo } from '../../hooks/useModal';
import useCheckItems from '../../hooks/useCheckItems';
import Modal from '../../components/Modal/Modal';
import {
  dummyGoalTitleIssueGroups,
  dummyPriorityGoalGroups,
  dummyPriorityIssueGroups,
  dummyStatusGoalGroups,
  dummyStatusIssueGroups,
} from '../../types/testDummy';
import { GoalItem } from '../../components/ListView/GoalItem';
import { IssueItem } from '../../components/ListView/IssueItem';
import { PRIORITY_LABELS, STATUS_LABELS, type ItemFilter } from '../../types/listItem';
import type { GoalFilter } from '../../types/goal';
import type { IssueFilter } from '../../types/issue';
import GroupTypeIcon from '../../components/ListView/GroupTypeIcon';
import { getSortedGrouped } from '../../utils/listGroupSortUtils';
import GroupTypeTab from '../../components/ListView/GroupTypeTab';

const TAB_LIST = ['goal', 'issue', 'external'] as const;
type NotiTab = (typeof TAB_LIST)[number];

const NotiHome = () => {
  const [tab, setTab] = useState<NotiTab>('goal');
  const [filter, setFilter] = useState<ItemFilter>('상태');
  const isGoal = tab === 'goal';
  const isIssue = tab === 'issue';

  const filterOptions: ItemFilter[] = isGoal // 담당자필터 제거
    ? ['상태', '우선순위']
    : isIssue
      ? ['상태', '우선순위', '목표']
      : []; // TODO : 외부 데이터 필터링 옵션 추가

  const getDummyGroups = (tab: NotiTab, filter: ItemFilter) => {
    if (tab === 'goal') {
      if (filter === '상태') return dummyStatusGoalGroups;
      if (filter === '우선순위') return dummyPriorityGoalGroups;
      return [];
    }
    if (tab === 'issue') {
      if (filter === '상태') return dummyStatusIssueGroups;
      if (filter === '우선순위') return dummyPriorityIssueGroups;
      if (filter === '목표') return dummyGoalTitleIssueGroups;
      return [];
    }
    if (tab === 'external') {
      // 외부 데이터는 아직 없음
      return [];
    }
    return [];
  };

  const handleTabChange = (newTab: NotiTab) => {
    setTab(newTab);
    setFilter('상태'); // 탭 변경 시 필터 초기화
    setCheckedIds([]); // 탭 변경 시 선택 해제
  };

  const dummyGroups = getDummyGroups(tab, filter);
  const allItems = isGoal
    ? (dummyGroups as GoalFilter[]).flatMap((g) => g.goals)
    : isIssue
      ? (dummyGroups as IssueFilter[]).flatMap((g) => g.issues)
      : [];

  const {
    checkedIds: checkItems,
    isAllChecked,
    handleCheck,
    handleSelectAll,
    setCheckedIds,
  } = useCheckItems(allItems, 'id');

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const { isOpen, content } = useDropdownInfo();
  const { openDropdown, closeDropdown } = useDropdownActions();
  const { isOpen: isModalOpen, content: modalContent } = useModalInfo();
  const { openModal } = useModalActions();

  const handleDeleteClick = () => {
    if (isDeleteMode && checkItems.length > 0) {
      openModal({
        name: `${checkItems.length}개의 ${tab} 알림을 삭제하시겠습니까?`,
      });
    } else {
      setIsDeleteMode((prev) => !prev);
      if (!isDeleteMode) setCheckedIds([]);
    }
  };

  // TODO : 외부 데이터 필터링 옵션 추가
  const grouped = isGoal
    ? (dummyGroups as GoalFilter[]).map((g) => ({ key: g.filterName, items: g.goals }))
    : (dummyGroups as IssueFilter[]).map((g) => ({ key: g.filterName, items: g.issues }));

  const sortedGrouped = getSortedGrouped(filter, grouped);

  const isEmpty = sortedGrouped.every(({ items }) => items.length === 0);

  return (
    <div className="flex flex-1 flex-col gap-[3.2rem] p-[3.2rem]">
      {/* 알림 아이콘/텍스트 */}
      <TeamIcon teamName="알림" teamImgUrl={BellIcon} />
      {/* 툴바 */}
      <ListViewToolbar
        filter={filter}
        isDeleteMode={isDeleteMode}
        isAllChecked={isAllChecked}
        filterOptions={filterOptions}
        onFilterClick={() => openDropdown({ name: 'filter' })}
        onFilterSelect={(option) => {
          setFilter(option as ItemFilter);
          setCheckedIds([]); // 필터 변경 시 선택 해제
          closeDropdown();
        }}
        onDeleteClick={handleDeleteClick}
        onSelectAllChange={handleSelectAll}
        dropdownProps={{ isOpen, content, closeDropdown }}
      />
      {/* 탭 버튼 */}
      <GroupTypeTab currentTab={tab} onTabChange={handleTabChange} />
      {isModalOpen && modalContent && <Modal subtitle={modalContent.name} />}
      {isEmpty ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="font-body-r">새로운 알림이 없습니다</div>
        </div>
      ) : (
        /* 리스트뷰 */
        <div className="flex flex-col gap-[4.8rem]">
          {sortedGrouped.map(({ key, items }) =>
            items.length > 0 ? (
              <div key={key}>
                <div className="flex justify-between pb-[1.6em]">
                  <div
                    className={`flex font-title-sub-b h-[2.8rem] overflow-hidden ${filter === '우선순위' ? 'items-end' : 'items-center'}`}
                  >
                    <GroupTypeIcon filter={filter} typeKey={key} />
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
                </div>
                {/* 리스트 아이템 */}
                {items.map((item) =>
                  tab === 'goal' ? (
                    <GoalItem
                      key={item.id}
                      {...item}
                      showCheckbox={isDeleteMode}
                      checked={checkItems.includes(item.id)}
                      onCheckChange={(checked) => handleCheck(item.id, checked)}
                      filter={filter}
                    />
                  ) : (
                    <IssueItem
                      key={item.id}
                      {...item}
                      showCheckbox={isDeleteMode}
                      checked={checkItems.includes(item.id)}
                      onCheckChange={(checked) => handleCheck(item.id, checked)}
                      filter={filter}
                    />
                  )
                )}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default NotiHome;
