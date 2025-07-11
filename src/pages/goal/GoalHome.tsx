import { GoalItem } from '../../components/ListView/GoalItem';
import FilterIcon from '../../assets/icons/filter.svg';
import TrashIcon from '../../assets/icons/trash-black.svg';
import TrashRedIcon from '../../assets/icons/trash.svg';
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
import Dropdown from '../../components/Dropdown/Dropdown';
import SelectAllCheckbox from '../../components/ListView/SelectAllCheckbox';
import TeamIcon from '../../components/ListView/TeamIcon';

/*
  추후 더미데이터 대신 실제 api 명세서 참고하여 수정 예정
*/
const dummyGoals: Partial<GoalItemProps>[] = [
  /**/
  {
    goalId: 'Veco-g4',
    title: 'API 연동',
    status: '진행중',
    priority: '높음',
    deadline: '2025-07-01',
    manage: '김선화',
  },
  {
    goalId: 'Veco-g1',
    title: '최대스무자까지작성가능최대스무자까지작성',
    status: '완료',
    priority: '보통',
    deadline: '2025-07-02',
    manage: '이가을',
  },
  {
    goalId: 'Veco-g2',
    title: '목표명을 작성합니다',
    status: '완료',
    priority: '긴급',
    deadline: '2025-07-10',
    manage: '박유민',
  },
  {
    goalId: 'Veco-g3',
    title: '최대스무자까지작성가능최대스무자까지작성',
    status: '해야할 일',
    priority: '낮음',
    deadline: '2025-07-20',
    manage: '박유민',
  },
];

// '없음', '', undefined 모두 '없음' 처리
function getManagers(issues: typeof dummyGoals) {
  const set = new Set(issues.map((i) => (!i.manage || i.manage === '' ? '없음' : i.manage)));
  const arr = Array.from(set).filter((m) => m !== '없음');
  return ['없음', ...arr];
}

const GoalHome = () => {
  const { isOpen, content } = useDropdownInfo();
  const { openDropdown, closeDropdown } = useDropdownActions();
  const [filter, setFilter] = useState<ItemFilter>('상태');

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const isAllChecked =
    dummyGoals.length > 0 &&
    dummyGoals.every((goal) => goal.goalId && checkItems.includes(goal.goalId));

  const handleCheck = (goalId: string, checked: boolean) => {
    setCheckItems(
      (prev) =>
        checked
          ? [...prev, goalId] // 체크 시 goalId 추가
          : prev.filter((id) => id !== goalId) // 체크 해제 시 goalId 제거
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setCheckItems(dummyGoals.map((goal) => goal.goalId || ''));
    } else {
      setCheckItems([]);
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
      <div className="flex flex-1 flex-col gap-[3.2rem]">
        {/* 팀 아이콘, 팀명, props로 요소 전달 가능 */}
        <TeamIcon />
        {/* 필터 선택 */}
        <div className="flex justify-between">
          <div className="flex items-center">
            {isDeleteMode ? (
              <SelectAllCheckbox checked={isAllChecked} onCheckChange={handleSelectAll} />
            ) : (
              ''
            )}
          </div>
          <div className="flex gap-[2.4rem] items-center">
            {/* 필터영역 */}
            <div className="relative">
              <div
                className="flex gap-[0.8rem] items-center cursor-pointer relative"
                onClick={() => openDropdown({ name: 'filter' })}
              >
                {/* 드롭다운 */}
                <img src={FilterIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
                <span className="font-body-r">필터</span>
                {isOpen && content && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <Dropdown
                      defaultValue="필터"
                      options={['상태', '우선순위', '담당자']}
                      onSelect={(option) => {
                        setFilter(option as ItemFilter);
                      }}
                      onClose={closeDropdown}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* 삭제버튼 */}
            <div
              className="flex gap-[0.4rem] items-center cursor-pointer"
              onClick={() => {
                setIsDeleteMode((prev) => !prev);
                if (!isDeleteMode) setCheckItems([]);
              }}
            >
              <img
                src={isDeleteMode ? TrashRedIcon : TrashIcon}
                className="inline-block w-[2.4rem] h-[2.4rem]"
                alt=""
              />
              <span className={`font-body-r ${isDeleteMode ? 'text-[#D44242]' : ''}`}>삭제</span>
            </div>
          </div>
        </div>
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
