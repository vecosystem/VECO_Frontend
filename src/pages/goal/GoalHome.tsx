import { GoalItem } from '../../components/ListView/GoalItem';
import PlusIcon from '../../assets/icons/plus.svg';
import { useEffect, useMemo, useState } from 'react';
import { PRIORITY_LABELS, STATUS_LABELS, type ItemFilter } from '../../types/listItem';
import GroupTypeIcon from '../../components/ListView/GroupTypeIcon';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import TeamIcon from '../../components/ListView/TeamIcon';
import useCheckItems from '../../hooks/useCheckItems';
import ListViewToolbar from '../../components/ListView/ListViewToolbar';
import { useModalActions, useModalInfo } from '../../hooks/useModal';
import Modal from '../../components/Modal/Modal';
import type { GroupedGoal } from '../../types/goal';
import { getSortedGrouped } from '../../utils/listGroupSortUtils';
import { useNavigate, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useGetInfiniteGoalList } from '../../apis/goal/useGetGoalList';
import { useDeleteGoals } from '../../apis/goal/useDeleteGoals';
import ListViewItemSkeletonList from '../../components/ListView/ListViewItemSkeletonList';
import { mergeGroups } from '../../components/ListView/MergeGroup';
import ServerError from '../ServerError';
import { useManagerProfiles } from '../../hooks/useManagerProfiles';
import { useGetWorkspaceTeams } from '../../apis/setting/useGetWorkspaceTeams';

const FILTER_OPTIONS: ItemFilter[] = ['상태', '우선순위', '담당자'] as const;

const GoalHome = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { isOpen, content } = useDropdownInfo();
  const { openDropdown, closeDropdown } = useDropdownActions();
  const [filter, setFilter] = useState<ItemFilter>('상태');

  const handleClick = () => {
    navigate('detail/create');
  };

  // 팀 정보 불러오기
  const { data: teamData } = useGetWorkspaceTeams();
  const currentTeam = useMemo(() => {
    return teamData?.pages[0].teamList.find((team) => team.teamId === Number(teamId));
  }, [teamData, teamId]);

  const filterToQuery = (filter: ItemFilter) => {
    switch (filter) {
      case '상태':
        return 'state';
      case '우선순위':
        return 'priority';
      case '담당자':
        return 'manager';
      default:
        return '';
    }
  };

  const params = useMemo(
    () => ({
      // 우선 기본값 설정
      cursor: '-1',
      size: 3,
      query: filterToQuery(filter),
    }),
    [filter]
  );

  // 데이터 불러오기
  const { data, isFetchingNextPage, isLoading, isError, hasNextPage, fetchNextPage } =
    useGetInfiniteGoalList(teamId ?? '', params);

  // 그룹화
  const goalGroups = data?.pages ?? [];
  const allGoalsFlat = goalGroups.flatMap((g) => g.goals);

  const allGroups: GroupedGoal[] = goalGroups.map((g) => ({
    key: g.filterName,
    items: g.goals,
  }));

  const grouped = mergeGroups(allGroups);
  const sortedGrouped = getSortedGrouped(filter, grouped);
  const isEmpty = grouped.every(({ items }) => items.length === 0);

  // 무한스크롤 fetching
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  // 삭제 관련 상태 및 함수
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

  const { mutate: deleteGoalItem } = useDeleteGoals();
  const handleDeleteItem = () => {
    deleteGoalItem(
      {
        teamId: teamId ?? '',
        goalIds: checkItems.map(Number),
      },
      {
        onSuccess: () => {
          setIsDeleteMode(false);
          setCheckedIds([]);
        },
      }
    );
  };

  const managerProfiles = useManagerProfiles(allGoalsFlat);

  if (isError) {
    return <ServerError error={new Error()} resetErrorBoundary={() => window.location.reload()} />;
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-[3.2rem] p-[3.2rem]">
        <TeamIcon teamName={currentTeam?.teamName} teamImgUrl={currentTeam?.teamImageUrl} />
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
        {isModalOpen && modalContent && (
          <Modal
            title="알림"
            subtitle="복구할 수 없습니다. 정말 삭제하시겠습니까?"
            buttonText="삭제"
            buttonColor="bg-error-400"
            // 삭제 요소 전달
            onClick={() => {
              console.log('삭제할 ID 리스트:', checkItems);
              handleDeleteItem();
            }}
          />
        )}
        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div
              className="font-body-r cursor-pointer underline decoration-1 text-gray-500 [text-underline-position:under]"
              onClick={handleClick}
            >
              목표를 생성하세요
            </div>
          </div>
        ) : isLoading ? (
          <ListViewItemSkeletonList />
        ) : (
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
                        profileImgUrl={
                          filter === '담당자' && managerProfiles[key]
                            ? managerProfiles[key]
                            : undefined
                        }
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
                      onItemClick={() => navigate(`/workspace/team/${teamId}/goal/${goal.id}`)}
                    />
                  ))}
                </div>
              ) : null
            )}
            <div ref={ref}>{isFetchingNextPage && <ListViewItemSkeletonList count={3} />}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default GoalHome;
