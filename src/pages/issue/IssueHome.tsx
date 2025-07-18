import PlusIcon from '../../assets/icons/plus.svg';
import { useMemo, useState } from 'react';
import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  type ItemFilter,
  type PriorityCode,
  type StatusCode,
} from '../../types/listItem';
import GroupTypeIcon from '../../components/ListView/GroupTypeIcon';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import TeamIcon from '../../components/ListView/TeamIcon';
import { IssueItem } from '../../components/ListView/IssueItem';
import useCheckItems from '../../hooks/useCheckItems';
import ListViewToolbar from '../../components/ListView/ListViewToolbar';
import { useModalActions, useModalInfo } from '../../hooks/useModal';
import Modal from '../../components/Modal/Modal';
import {
  dummyGoalTitleIssueGroups,
  dummyManagerIssueGroups,
  dummyPriorityIssueGroups,
  dummyStatusIssueGroups,
} from '../../types/testDummy';
import type { GroupedIssue, IssueFilter } from '../../types/issue';
import { getSortedGrouped } from '../../utils/listGroupSortUtils';

const FILTER_OPTIONS: ItemFilter[] = ['상태', '우선순위', '담당자', '목표'] as const;

const IssueHome = () => {
  const { isOpen, content } = useDropdownInfo();
  const { openDropdown, closeDropdown } = useDropdownActions();
  const [filter, setFilter] = useState<ItemFilter>('상태');

  // filter 변경마다 다른 데이터 선택 -> 추후 새로운 데이터 불러오도록
  const dimmyIssueGroups = useMemo<IssueFilter[]>(() => {
    switch (filter) {
      case '상태':
        return dummyStatusIssueGroups;
      case '우선순위':
        return dummyPriorityIssueGroups;
      case '담당자':
        return dummyManagerIssueGroups;
      case '목표':
        return dummyGoalTitleIssueGroups;
      default:
        return [];
    }
  }, [filter]);

  const allGoalsFlat = dimmyIssueGroups.flatMap((i) => i.issues);

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
        name: `${checkItems.length}개의 이슈를 삭제하시겠습니까?`,
      });
    } else {
      setIsDeleteMode((prev) => !prev);
      if (!isDeleteMode) setCheckedIds([]);
    }
  };

  // 그룹핑
  const grouped: GroupedIssue[] = dimmyIssueGroups.map((i) => ({
    key: i.filterName,
    items: i.issues,
  }));

  const sortedGrouped = getSortedGrouped(filter, grouped);
  const isEmpty = grouped.every(({ items }) => items.length === 0);

  return (
    <>
      <div className="flex flex-1 flex-col gap-[3.2rem] p-[3.2rem]">
        {/* 팀 아이콘, 팀명, props로 요소 전달 가능 */}
        <TeamIcon />
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
                    {/* TODO : 추가 버튼 라우터 연결 */}
                    <img src={PlusIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
                  </div>
                  {/* 각 유형 별 요소 */}
                  {items.map((issue) => (
                    <IssueItem
                      showCheckbox={isDeleteMode}
                      checked={checkItems.includes(issue.id ?? '')}
                      onCheckChange={(checked) => issue.id && handleCheck(issue.id, checked)}
                      key={issue.id}
                      id={issue.id}
                      name={issue.name}
                      title={issue.title}
                      status={issue.status as StatusCode}
                      priority={issue.priority as PriorityCode}
                      goaltitle={issue.goaltitle}
                      deadline={issue.deadline}
                      managers={issue.managers}
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

export default IssueHome;
