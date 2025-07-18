import { GoalItem } from '../../components/ListView/GoalItem';
import PlusIcon from '../../assets/icons/plus.svg';
import { useState } from 'react';
import {
  PRIORITY_LIST,
  STATUS_LIST,
  type GoalItemProps,
  type ItemFilter,
} from '../../types/listItem';
import GroupTypeIcon from '../../components/ListView/GroupTypeIcon';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import TeamIcon from '../../components/ListView/TeamIcon';
import useCheckItems from '../../hooks/useCheckItems';
import { getManagers } from '../../utils/listGroupingUtils';
import ListViewToolbar from '../../components/ListView/ListViewToolbar';
import { useModalActions, useModalInfo } from '../../hooks/useModal';
import Modal from '../../components/Modal/Modal';

/*
  추후 더미데이터 대신 실제 api 명세서 참고하여 수정 예정
*/
const dummyGoals: Partial<GoalItemProps>[] = [
  /**/
  {
    goalId: 'Veco-g1',
    title: '백호를 사용해서 다른 사람들과 협업해보기',
    status: '없음',
    priority: '보통',
    deadline: '25.05.02',
    manage: '이가을',
  },
  {
    goalId: 'Veco-g2',
    title: '백호를 사용해서 다른 사람들과 협업해보기',
    status: '진행중',
    priority: '긴급',
    deadline: '25.05.02',
    manage: '박유민',
  },
  {
    goalId: 'Veco-g3',
    title: '백호를 사용해서 다른 사람들과 협업해보기',
    status: '해야할 일',
    priority: '높음',
    deadline: '25.05.02',
    manage: '박유민',
  },
  {
    goalId: 'Veco-g4',
    title: '백호를 사용해서 다른 사람들과 협업해보기',
    status: '완료',
    priority: '없음',
    deadline: '25.05.02',
    manage: '김선화',
  },
  {
    goalId: 'Veco-g5',
    title: '백호를 사용해서 다른 사람들과 협업해보기',
    status: '검토',
    priority: '낮음',
    deadline: '25.05.02',
    manage: '김선화',
  },
];

const GoalHome = () => {
  const { isOpen, content } = useDropdownInfo();
  const { openDropdown, closeDropdown } = useDropdownActions();
  const [filter, setFilter] = useState<ItemFilter>('상태');

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const {
    checkedIds: checkItems,
    isAllChecked,
    handleCheck,
    handleSelectAll,
    setCheckedIds,
  } = useCheckItems(dummyGoals, 'goalId');

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

  // 그룹핑
  const groupKeys = (
    filter === '상태'
      ? STATUS_LIST
      : filter === '우선순위'
        ? PRIORITY_LIST
        : getManagers(dummyGoals)
  ) as string[];

  const grouped = groupKeys.map((key) => ({
    key,
    items: dummyGoals.filter((goal) =>
      filter === '상태'
        ? goal.status === key
        : filter === '우선순위'
          ? goal.priority === key
          : (!goal.manage || goal.manage === '' ? '없음' : goal.manage) === key
    ),
  }));

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
          filterOptions={['상태', '우선순위', '담당자']}
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
            {grouped.map(({ key, items }) =>
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
                      <div>{key}</div>
                      <div className="text-gray-500 ml-[0.8rem]">{items.length}</div>
                    </div>
                    {/* TODO : 추가 버튼 라우터 연결 */}
                    <img src={PlusIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
                  </div>
                  {/* 각 유형 별 요소 */}
                  {items.map((goal) => (
                    <GoalItem
                      showCheckbox={isDeleteMode}
                      checked={checkItems.includes(goal.goalId || '')}
                      onCheckChange={(checked) => goal.goalId && handleCheck(goal.goalId, checked)}
                      key={goal.goalId}
                      {...goal}
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

export default GoalHome;
