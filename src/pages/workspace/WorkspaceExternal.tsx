import PlusIcon from '../../assets/icons/plus.svg';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import { useEffect, useMemo, useState } from 'react';
import {
  EXTERNAL_LABELS,
  PRIORITY_LABELS,
  STATUS_LABELS,
  type ItemFilter,
} from '../../types/listItem';
import useCheckItems from '../../hooks/useCheckItems';
import { useModalActions, useModalInfo } from '../../hooks/useModal';
import ListViewToolbar from '../../components/ListView/ListViewToolbar';
import Modal from '../../components/Modal/Modal';
import type { GroupedExternal } from '../../types/external';
import { getSortedGrouped } from '../../utils/listGroupSortUtils';
import GroupTypeIcon from '../../components/ListView/GroupTypeIcon';
import { ExternalItem } from '../../components/ListView/ExternalItem';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetInfiniteExternalList } from '../../apis/external/useGetExternalList';
import { useDeleteExternals } from '../../apis/external/useDeleteExternals';
import { mergeGroups } from '../../components/ListView/MergeGroup';
import { useInView } from 'react-intersection-observer';
import ServerError from '../ServerError';
import ListViewItemSkeletonList from '../../components/ListView/ListViewItemSkeletonList';
import { useGetExternalLinks } from '../../apis/external/useGetExternalLinks.ts';
import { useManagerProfiles } from '../../hooks/useManagerProfiles.ts';
import ExternalToolArea from '../external/components/ExternalToolArea.tsx';
import WorkspaceIcon from '../../components/ListView/WorkspaceIcon.tsx';

const FILTER_OPTIONS = ['상태', '우선순위', '담당자', '목표', '외부'] as const;

const WorkspaceExternal = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { isOpen, content } = useDropdownInfo();
  const { openDropdown, closeDropdown } = useDropdownActions();
  const [filter, setFilter] = useState<ItemFilter>('상태');

  const handleClick = () => {
    navigate('detail/create');
  };

  const filterToQuery = (filter: ItemFilter) => {
    switch (filter) {
      case '상태':
        return 'STATE';
      case '우선순위':
        return 'PRIORITY';
      case '담당자':
        return 'ASSIGNEE';
      case '목표':
        return 'GOAL';
      case '외부':
        return 'EXT_TYPE';
      default:
        return '';
    }
  };

  const params = useMemo(
    () => ({
      // 우선 기본값 설정
      // cursor: '-1',
      // size: 3,
      query: filterToQuery(filter),
    }),
    [filter]
  );

  // 데이터 불러오기
  const { data, isFetchingNextPage, isLoading, isError, hasNextPage, fetchNextPage } =
    useGetInfiniteExternalList(teamId ?? '', params);

  // 그룹화
  const externalGroups = data?.pages ?? [];
  const allExternalsFlat = externalGroups.flatMap((g) => g.externals);

  const { data: externalLinks } = useGetExternalLinks(Number(teamId));

  const allGroups: GroupedExternal[] = externalGroups.map((g) => ({
    key: g.filterName,
    items: g.externals,
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
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 삭제 관련 상태 및 함수
  const {
    checkedIds: checkItems,
    isAllChecked,
    handleCheck,
    handleSelectAll,
    setCheckedIds,
  } = useCheckItems(allExternalsFlat, 'id');

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

  const { mutate: deleteGoalItem } = useDeleteExternals();
  const handleDeleteItem = () => {
    deleteGoalItem(
      {
        teamId: teamId ?? '',
        externalIds: checkItems.map(Number),
      },
      {
        onSuccess: () => {
          setIsDeleteMode(false);
          setCheckedIds([]);
        },
      }
    );
  };

  const managerProfiles = useManagerProfiles(allExternalsFlat);

  if (isError) {
    return <ServerError error={new Error()} resetErrorBoundary={() => window.location.reload()} />;
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-[3.2rem] p-[3.2rem]">
        <div className="flex items-center">
          {/* 워크스페이스 아이콘, 워크스페이스명, props로 요소 전달 가능 */}
          <WorkspaceIcon />
          {externalLinks && (
            <ExternalToolArea
              isLinkedWithGithub={externalLinks.linkedWithGithub}
              isLinkedWithSlack={externalLinks.linkedWithSlack}
            />
          )}
        </div>
        <ListViewToolbar
          filter={filter}
          isDeleteMode={isDeleteMode}
          isAllChecked={isAllChecked}
          showSelectAll={grouped.some(({ items }) => items.length > 0)}
          filterOptions={[...FILTER_OPTIONS]}
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
              외부 이슈를 생성하세요
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
                            : filter === '외부'
                              ? EXTERNAL_LABELS[key as keyof typeof EXTERNAL_LABELS] || key
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
                  {items.map((externals) => (
                    <ExternalItem
                      key={externals.id}
                      {...externals}
                      showCheckbox={isDeleteMode}
                      checked={checkItems.includes(externals.id)}
                      onCheckChange={(checked) => handleCheck(externals.id, checked)}
                      filter={filter}
                      onItemClick={() => navigate(`/workspace/team/${teamId}/ext/${externals.id}`)}
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

export default WorkspaceExternal;
