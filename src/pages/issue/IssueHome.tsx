import FilterIcon from '../../assets/icons/filter.svg';
import TrashIcon from '../../assets/icons/trash-black.svg';
import TrashRedIcon from '../../assets/icons/trash.svg';
import PlusIcon from '../../assets/icons/plus.svg';
import { useState } from 'react';
import {
  PRIORITY_LIST,
  STATUS_LIST,
  type IssueItemProps,
  type ItemFilter,
} from '../../types/listItem';
import GroupTypeIcon from '../../components/ListView/GroupTypeIcon';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import Dropdown from '../../components/Dropdown/Dropdown';
import SelectAllCheckbox from '../../components/ListView/SelectAllCheckbox';
import TeamIcon from '../../components/ListView/TeamIcon';
import { IssueItem } from '../../components/ListView/IssueItem';
import useCheckItems from '../../hooks/useCheckItems';
import { getGoals, getManagers } from '../../utils/listGroupingUtils';

/*
  추후 더미데이터 대신 실제 api 명세서 참고하여 수정 예정
*/
const dummyIssues: Partial<IssueItemProps>[] = [
  {
    issueId: 'Veco-i4',
    issueTitle: 'API 연동API 연동API 연동API 연동',
    // goalTitle: '없음',
    status: '진행중',
    priority: '없음',
    deadline: '2025-07-01',
    // manage: '김선화',
  },
  {
    issueId: 'Veco-i3',
    issueTitle: '최대스무자까지작성가능최대스무자까지작성',
    goalTitle: '목표 제목 작성',
    status: '해야할 일',
    priority: '낮음',
    deadline: '2025-07-20',
    manage: '없음',
  },
  {
    issueId: 'Veco-i1',
    issueTitle: '최대스무자까지작성가능최대스무자까지작성',
    goalTitle: '기획 및 요구사항 분석',
    status: '완료',
    priority: '보통',
    deadline: '2025-07-02',
    manage: '이가을',
  },
  {
    issueId: 'Veco-i2',
    issueTitle: '이슈명을 작성합니다',
    goalTitle: '목표 제목 작성',
    status: '완료',
    priority: '긴급',
    deadline: '2025-07-10',
    manage: '박유민',
  },
];

const IssueHome = () => {
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
  } = useCheckItems(dummyIssues, 'issueId');

  // 그룹핑
  const groupKeys = (
    filter === '상태'
      ? STATUS_LIST
      : filter === '우선순위'
        ? PRIORITY_LIST
        : filter === '담당자'
          ? getManagers(dummyIssues)
          : getGoals(dummyIssues)
  ) as string[]; // 목표 필터는 고정된 값

  const grouped = groupKeys.map((key) => ({
    key,
    items: dummyIssues.filter((issue) =>
      filter === '상태'
        ? issue.status === key
        : filter === '우선순위'
          ? issue.priority === key
          : filter === '담당자'
            ? (!issue.manage || issue.manage === '' ? '없음' : issue.manage) === key
            : (!issue.goalTitle || issue.goalTitle === '' ? '없음' : issue.goalTitle) === key
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
                      options={['상태', '우선순위', '담당자', '목표']}
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
                if (!isDeleteMode) setCheckedIds([]);
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
                  {items.map((issue) => (
                    <IssueItem
                      showCheckbox={isDeleteMode}
                      checked={checkItems.includes(issue.issueId || '')}
                      onCheckChange={(checked) =>
                        issue.issueId && handleCheck(issue.issueId, checked)
                      }
                      key={issue.issueId}
                      {...issue}
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
