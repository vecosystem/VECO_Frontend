import { useMemo, useState } from 'react';
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
import { usePatchAlarms } from '../../apis/alarm/usePatchAlarms';
import { useGetAlarmList } from '../../apis/alarm/useGetAlarmList';
import { useDeleteAlarms } from '../../apis/alarm/useDeleteAlarms';
import ListViewItemSkeletonList from '../../components/ListView/ListViewItemSkeletonList';
import ServerError from '../ServerError';

const TAB_LIST = ['GOAL', 'ISSUE', 'EXTERNAL'] as const;
type NotiTab = (typeof TAB_LIST)[number];

const FILTER_OPTIONS: Record<NotiTab, ItemFilter[]> = {
  GOAL: ['상태', '우선순위'],
  ISSUE: ['상태', '우선순위', '목표'],
  EXTERNAL: ['상태', '우선순위', '목표', '외부'],
};

const NotiHome = () => {
  const [tab, setTab] = useState<NotiTab>('GOAL');
  const [filter, setFilter] = useState<ItemFilter>('상태');

  const filterToQuery = (tab: NotiTab, filter: ItemFilter) => {
    if (tab === 'GOAL') {
      if (filter === '상태') return 'state';
      if (filter === '우선순위') return 'priority';
    }
    if (tab === 'ISSUE') {
      if (filter === '상태') return 'state';
      if (filter === '우선순위') return 'priority';
      if (filter === '목표') return 'goal';
    }
    if (tab === 'EXTERNAL') {
      if (filter === '상태') return 'state';
      if (filter === '우선순위') return 'priority';
      if (filter === '목표') return 'goal';
      if (filter === '외부') return 'external';
    }
    return undefined;
  };

  const handleTabChange = (newTab: NotiTab) => {
    setTab(newTab);
    setFilter('상태'); // 탭 변경 시 필터 초기화
    setCheckedIds([]); // 탭 변경 시 선택 해제
  };

  const params = useMemo(
    () => ({
      // 우선 기본값 설정
      cursor: '-1',
      size: 10,
      query: filterToQuery(tab, filter),
    }),
    [tab, filter]
  );

  const { data, isLoading, isError } = useGetAlarmList(tab, params);
  const alarmGroups = data?.result?.groupedList ?? [];
  const allAlarmsFlat = useMemo(() => alarmGroups.flatMap((g) => g.notiList), [alarmGroups]);

  const grouped = useMemo(
    () =>
      alarmGroups.map((group) => ({
        key: group.groupTitle,
        items: group.notiList.map((item) => ({
          ...item,
          deadline: data?.result?.deadline,
        })),
      })),
    [alarmGroups, data?.result?.deadline]
  );
  const {
    checkedIds: checkItems,
    isAllChecked,
    handleCheck,
    handleSelectAll,
    setCheckedIds,
  } = useCheckItems(allAlarmsFlat, 'alarmId');

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

  const { mutate: patchAlarm } = usePatchAlarms();
  const { mutate: deleteAlarm } = useDeleteAlarms();

  const handleItemClick = (
    isRead: boolean,
    teamId: number,
    typeId: number,
    alarmId: number,
    pageType: string
  ) => {
    if (!isRead) {
      // 읽지 않은 알림
      // 읽음 처리 API 호출 후 상세 페이지로 이동
      patchAlarm(
        {
          alarmId,
        },
        {
          onSuccess: () => {
            console.log('알림 읽음 처리 성공');
            // 상세 페이지 새 창 열기
            if (pageType === 'goal') {
              window.open(`/workspace/team/${teamId}/goal/${typeId}`, '_blank');
            } else if (pageType === 'issue') {
              window.open(`/workspace/team/${teamId}/issue/${typeId}`, '_blank');
            } else if (pageType === 'external') {
              window.open(`/workspace/team/${teamId}/ext/${typeId}`, '_blank');
            }
          },
        }
      );
    } else {
      // 읽은 알림
      // 상세 페이지로 이동
      if (pageType === 'goal') {
        window.open(`/workspace/team/${teamId}/goal/${typeId}`, '_blank');
      } else if (pageType === 'issue') {
        window.open(`/workspace/team/${teamId}/issue/${typeId}`, '_blank');
      } else if (pageType === 'external') {
        window.open(`/workspace/team/${teamId}/ext/${typeId}`, '_blank');
      }
    }
  };

  const handleDeleteItem = () => {
    deleteAlarm(
      checkItems.filter((id): id is number => typeof id === 'number'), // 숫자만 전달
      {
        onSuccess: () => {
          setIsDeleteMode(false);
          setCheckedIds([]);
        },
      }
    );
  };

  if (isError) {
    return <ServerError error={new Error()} resetErrorBoundary={() => window.location.reload()} />;
  }

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
            handleDeleteItem();
          }}
        />
      )}
      {isEmpty ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="font-body-r">새로운 알림이 없습니다</div>
        </div>
      ) : isLoading ? (
        <ListViewItemSkeletonList />
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

                  if (tab == 'GOAL') {
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
                        managers={{
                          cnt: item.managerList?.length || 0,
                          info: item.managerList || [],
                        }}
                        onItemClick={() =>
                          handleItemClick(isRead, item.teamId, item.typeId, item.alarmId, 'goal')
                        }
                      />
                    );
                  }
                  if (tab == 'ISSUE') {
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
                        managers={{
                          cnt: item.managerList?.length || 0,
                          info: item.managerList || [],
                        }}
                        onItemClick={() =>
                          handleItemClick(isRead, item.teamId, item.typeId, item.alarmId, 'issue')
                        }
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
                      managers={{
                        cnt: item.managerList?.length || 0,
                        info: item.managerList || [],
                      }}
                      onItemClick={() =>
                        handleItemClick(isRead, item.teamId, item.typeId, item.alarmId, 'external')
                      }
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
