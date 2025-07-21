import PlusIcon from '../../assets/icons/plus.svg';
import TeamIcon from '../../components/ListView/TeamIcon';
import LinkButton from '../../assets/icons/link-button.svg';
import GitIcon from '../../assets/icons/github.svg';
import SlackIcn from '../../assets/icons/slack.svg';
import PlusBlueIcon from '../../assets/icons/plus-blue.svg';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import { useMemo, useState } from 'react';
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
import type { ExternalFilter, GroupedExternal } from '../../types/external';
import {
  dummyExternalToolExternalGroups,
  dummyGoalTitleExternalGroups,
  dummyManagerExternalGroups,
  dummyPriorityExternalGroups,
  dummyStatusExternalGroups,
} from '../../types/testDummy';
import { getSortedGrouped } from '../../utils/listGroupSortUtils';
import GroupTypeIcon from '../../components/ListView/GroupTypeIcon';
import { ExternalItem } from '../../components/ListView/ExternalItem';

const FILTER_OPTIONS = ['상태', '우선순위', '담당자', '목표', '외부'] as const;

const ExternalHome = () => {
  const { isOpen, content } = useDropdownInfo();
  const { openDropdown, closeDropdown } = useDropdownActions();
  const [filter, setFilter] = useState<ItemFilter>('상태');

  // filter 변경마다 다른 데이터 선택 -> 추후 새로운 데이터 불러오도록
  const dummyExternalGroups = useMemo<ExternalFilter[]>(() => {
    switch (filter) {
      case '상태':
        return dummyStatusExternalGroups;
      case '우선순위':
        return dummyPriorityExternalGroups;
      case '담당자':
        return dummyManagerExternalGroups;
      case '목표':
        return dummyGoalTitleExternalGroups;
      case '외부':
        return dummyExternalToolExternalGroups;
      default:
        return [];
    }
  }, [filter]);

  const allExternalsFlat = dummyExternalGroups.flatMap((i) => i.issues);

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

  // 그룹핑
  const grouped: GroupedExternal[] = dummyExternalGroups.map((i) => ({
    key: i.filterName,
    items: i.issues,
  }));

  const sortedGrouped = getSortedGrouped(filter, grouped);
  const isEmpty = grouped.every(({ items }) => items.length === 0);

  return (
    <>
      <div className="flex flex-1 flex-col gap-[3.2rem] p-[3.2rem]">
        <div className="flex items-center">
          <TeamIcon />
          {/* 아래 부분 연동 여부에 따라 다르게 보임. 추후 컴포넌트 분리*/}
          <img src={LinkButton} className="ml-[1.6rem] cursor-pointer" alt="외부 리소스 연결" />
          <div className="flex gap-[2rem] ml-[3.2rem]">
            <img src={GitIcon} className="w-[2.4rem] h-[2.4rem]" alt="GitHub" />
            <img src={SlackIcn} className="w-[2.4rem] h-[2.4rem]" alt="Slack" />
          </div>
          <img
            src={PlusBlueIcon}
            className="ml-[3.2rem] w-[2.4rem] h-[2.4rem] cursor-pointer"
            alt="추가"
          />
        </div>
        <ListViewToolbar
          filter={filter}
          isDeleteMode={isDeleteMode}
          isAllChecked={isAllChecked}
          showSelectAll={dummyExternalGroups.length > 0}
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
        {isModalOpen && modalContent && <Modal subtitle={modalContent.name} />}
        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="font-body-r">외부 연동이 없습니다</div>
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
                            : filter === '외부'
                              ? EXTERNAL_LABELS[key as keyof typeof EXTERNAL_LABELS] || key
                              : key}
                      </div>
                      <div className="text-gray-500 ml-[0.8rem]">{items.length}</div>
                    </div>
                    {/* TODO : 추가 버튼 라우터 연결 */}
                    <img src={PlusIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
                  </div>
                  {/* 각 유형 별 요소 */}
                  {items.map((issue) => (
                    <ExternalItem
                      key={issue.id}
                      {...issue}
                      showCheckbox={isDeleteMode}
                      checked={checkItems.includes(issue.id)}
                      onCheckChange={(checked) => handleCheck(issue.id, checked)}
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

export default ExternalHome;
