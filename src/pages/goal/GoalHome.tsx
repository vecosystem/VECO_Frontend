import { GoalItem } from '../../components/ListView/GoalItem';
import BoxIcon from '../../assets/icons/box.svg';
import ListIcon from '../../assets/icons/list.svg';
import TrashIcon from '../../assets/icons/trash-black.svg';
import TrashIconRed from '../../assets/icons/trash.svg';
import PlusIcon from '../../assets/icons/plus.svg';
import { useState } from 'react';
import {
  PRIORITY_LIST,
  STATUS_LIST,
  type GoalItemProps,
  type ItemFilter,
  type Status,
} from '../../types/listItem';
import { getPriorityIcon, getStatusColor, getStatusIcon } from '../../utils/listItemUtils';

/*
  추후 더미데이터 대신 실제 api 명세서 참고하여 수정 예정
*/
const dummyGoals: Partial<GoalItemProps>[] = [
  {
    goalId: '1',
    title: 'API 연동',
    status: '진행중',
    priority: '높음',
    deadline: '2025-07-01',
    manage: '김선화',
  },
];

function getManagers(goals: typeof dummyGoals) {
  const set = new Set(goals.map((g) => g.manage));
  return ['없음', ...Array.from(set)];
}

const GoalHome = () => {
  const [filter, setFilter] = useState<ItemFilter>('status');

  // 그룹핑
  const groupKeys =
    filter === 'status'
      ? STATUS_LIST
      : filter === 'priority'
        ? PRIORITY_LIST
        : getManagers(dummyGoals);

  const grouped = groupKeys.map((key) => ({
    key,
    items: dummyGoals.filter((goal) =>
      filter === 'status'
        ? goal.status === key
        : filter === 'priority'
          ? goal.priority === key
          : goal.manage === key
    ),
  }));

  return (
    <>
      <div className="flex flex-col gap-[3.2rem]">
        {/* 팀 아이콘, 팀명 */}
        <div className="flex gap-[1.6rem] items-center">
          <span
            className="inline-block w-[3.2rem] h-[3.2rem] rounded-full bg-primary-variant-blue bg-center bg-cover"
            style={{ backgroundImage: `url()` }}
          />
          <div className="flex font-title-b">팀명</div>
        </div>

        {/* 필터 선택 */}
        <div className="flex justify-between">
          <div className="flex gap-[0.8rem] items-center">
            <img src={BoxIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
            <img src={ListIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
          </div>
          <div className="flex gap-[2.4rem] items-center">
            {/* 필터영역 */}
            <div className="flex gap-[0.8rem] items-center cursor-pointer relative">
              {/* 드롭다운 */}
            </div>
            <div className="flex gap-[0.4rem] items-center">
              <img src={TrashIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
              <span className="font-body-r">삭제</span>
            </div>
          </div>
        </div>

        {/* 리스트 뷰 */}
        <div className="flex flex-col gap-[6.4rem]">
          {grouped.map(({ key, items }) =>
            /* 해당 요소 존재할 때만 생성 */
            items.length > 0 ? (
              <div key={key}>
                <div className="flex justify-between pb-[3.2rem]">
                  <div className="flex font-title-sub-b gap-[0.8rem] items-center">
                    {filter === 'status' &&
                      (key === '삭제' ? (
                        <img
                          src={TrashIconRed}
                          alt="삭제"
                          className="w-[1.6rem] h-[1.6rem] mr-[0.4rem]"
                        />
                      ) : (
                        <span
                          className="inline-block rounded-full w-[1.6rem] h-[1.6rem] mr-[0.8rem]"
                          style={{ background: getStatusColor(key as Status) }}
                        />
                      ))}
                    {filter === 'priority' && (
                      <img
                        src={getPriorityIcon(key as any)}
                        alt={key}
                        className="w-[3.2rem] h-[3.2rem] mr-[0.8rem]"
                      />
                    )}
                    {filter === 'manage' && (
                      <span
                        className="inline-block w-[2.4rem] h-[2.4rem] rounded-full bg-gray-300 mr-[1.2rem] bg-center bg-cover"
                        style={{ backgroundImage: `url(')` }}
                      />
                    )}
                    {/* 유형명 */}
                    <div>{key}</div>
                    <div className="text-gray-500">{items.length}</div>
                  </div>
                  <img src={PlusIcon} className="inline-block w-[2.4rem] h-[2.4rem]" alt="" />
                </div>
                {/* 각 유형 별 요소 */}
                {items.map((goal) => (
                  <GoalItem key={goal.goalId} {...goal} filter={filter} />
                ))}
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
};

export default GoalHome;
