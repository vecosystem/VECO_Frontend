import { useState } from 'react';
import TeamIcon from '../../components/ListView/TeamIcon';
import BellIcon from '../../assets/icons/bell.svg';
import ListViewToolbar from '../../components/ListView/ListViewToolbar';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import { useModalActions, useModalInfo } from '../../hooks/useModal';
import useCheckItems from '../../hooks/useCheckItems';
import Modal from '../../components/Modal/Modal';
import { GoalItem } from '../../components/ListView/GoalItem';
import { IssueItem } from '../../components/ListView/IssueItem';
import { PRIORITY_LABELS, STATUS_LABELS, type ItemFilter } from '../../types/listItem';
import GroupTypeIcon from '../../components/ListView/GroupTypeIcon';
import GroupTypeTab from '../../components/ListView/GroupTypeTab';
import { ExternalItem } from '../../components/ListView/ExternalItem';
import {
  dummyExternalAlarmByGoal,
  dummyExternalAlarmByPriority,
  dummyExternalAlarmByState,
  dummyExternalAlarmByTool,
  dummyGoalAlarmByPriority,
  dummyGoalAlarmByState,
  dummyIssueAlarmByGoal,
  dummyIssueAlarmByPriority,
  dummyIssueAlarmByState,
} from '../../types/testNotiDummy';
import type { AlarmFilter } from '../../types/alarm';

const TAB_LIST = ['goal', 'issue', 'external'] as const;
type NotiTab = (typeof TAB_LIST)[number];

const FILTER_OPTIONS: Record<NotiTab, ItemFilter[]> = {
  goal: ['상태', '우선순위'],
  issue: ['상태', '우선순위', '목표'],
  external: ['상태', '우선순위', '목표', '외부'],
};

const NotiHome = () => {
  const [tab, setTab] = useState<NotiTab>('goal');
  const [filter, setFilter] = useState<ItemFilter>('상태');

  const getDummyGroups = (tab: NotiTab, filter: ItemFilter): AlarmFilter | undefined => {
    if (tab === 'goal') {
      if (filter === '상태') return dummyGoalAlarmByState.result;
      if (filter === '우선순위') return dummyGoalAlarmByPriority.result;
    }
    if (tab === 'issue') {
      if (filter === '상태') return dummyIssueAlarmByState.result;
      if (filter === '우선순위') return dummyIssueAlarmByPriority.result;
      if (filter === '목표') return dummyIssueAlarmByGoal.result;
    }
    if (tab === 'external') {
      if (filter === '상태') return dummyExternalAlarmByState.result;
      if (filter === '우선순위') return dummyExternalAlarmByPriority.result;
      if (filter === '목표') return dummyExternalAlarmByGoal.result;
      if (filter === '외부') return dummyExternalAlarmByTool.result;
    }
    return undefined;
  };

  const handleTabChange = (newTab: NotiTab) => {
    setTab(newTab);
    setFilter('상태'); // 탭 변경 시 필터 초기화
    setCheckedIds([]); // 탭 변경 시 선택 해제
  };

  const alarmGroups = getDummyGroups(tab, filter);

  const allItems = alarmGroups
    ? alarmGroups.groupedList.flatMap((group) =>
        group.notiList.map((item) => ({
          ...item,
          deadline: alarmGroups.deadline,
        }))
      )
    : [];

  const {
    checkedIds: checkItems,
    isAllChecked,
    handleCheck,
    handleSelectAll,
    setCheckedIds,
  } = useCheckItems(allItems, 'alarmId');

  const grouped = alarmGroups
    ? alarmGroups.groupedList.map((group) => ({
        key: group.groupTitle,
        items: group.notiList.map((item) => ({
          ...item,
          deadline: alarmGroups.deadline,
        })),
      }))
    : [];

  const isEmpty = grouped.every(({ items }) => items.length === 0);

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

  return (
    <div className="flex flex-1 flex-col gap-[3.2rem] p-[3.2rem]">
      {/* 알림 아이콘/텍스트 */}
      <TeamIcon teamName="알림" teamImgUrl={BellIcon} />
      {/* 툴바 */}
      <ListViewToolbar
        filter={filter}
        isDeleteMode={isDeleteMode}
        isAllChecked={isAllChecked}
        filterOptions={FILTER_OPTIONS[tab]}
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
      {isModalOpen && modalContent && (
        <Modal
          title="알림"
          subtitle="복구할 수 없습니다. 정말 삭제하시겠습니까?"
          buttonText="삭제"
          buttonColor="bg-error-400"
          // 삭제 요소 전달
          onClick={() => {
            console.log('삭제할 ID 리스트:', checkItems);
            // TODO: 실제 삭제 API mutation화
            // deleteGoalItem({ teamId, goalIds: checkItems });
          }}
        />
      )}
      {isEmpty ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="font-body-r">새로운 알림이 없습니다</div>
        </div>
      ) : (
        /* 리스트뷰 */
        <div className="flex flex-col gap-[4.8rem]">
          {grouped.map(({ key, items }) =>
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
                {items.map((item) => {
                  const isRead = item.read === true;
                  const showCheckbox = isDeleteMode;
                  const isChecked = checkItems.includes(item.alarmId);

                  if (tab == 'goal') {
                    return (
                      <GoalItem
                        key={item.alarmId}
                        {...item}
                        showCheckbox={showCheckbox}
                        checked={isChecked}
                        onCheckChange={(checked) => handleCheck(item.alarmId, checked)}
                        filter={filter}
                        variant={isRead ? 'read' : 'notification'}
                        deadline={item.deadline}
                      />
                    );
                  }
                  if (tab == 'issue') {
                    return (
                      <IssueItem
                        key={item.alarmId}
                        {...item}
                        showCheckbox={showCheckbox}
                        checked={isChecked}
                        onCheckChange={(checked) => handleCheck(item.alarmId, checked)}
                        filter={filter}
                        variant={isRead ? 'read' : 'notification'}
                        deadline={item.deadline}
                      />
                    );
                  }
                  return (
                    <ExternalItem
                      key={item.alarmId}
                      {...item}
                      showCheckbox={showCheckbox}
                      checked={isChecked}
                      onCheckChange={(checked) => handleCheck(item.alarmId, checked)}
                      filter={filter}
                      variant={isRead ? 'read' : 'notification'}
                      deadline={item.deadline}
                    />
                  );
                })}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default NotiHome;
