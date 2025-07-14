import PlusIcon from '../../assets/icons/plus.svg';
import { useState } from 'react';
import {
  PRIORITY_CODES,
  PRIORITY_LABELS,
  PRIORITY_LIST,
  STATUS_CODES,
  STATUS_LABELS,
  STATUS_LIST,
  type IssueItemProps,
  type ItemFilter,
} from '../../types/listItem';
import GroupTypeIcon from '../../components/ListView/GroupTypeIcon';
import { useDropdownActions, useDropdownInfo } from '../../hooks/useDropdown';
import TeamIcon from '../../components/ListView/TeamIcon';
import { IssueItem } from '../../components/ListView/IssueItem';
import useCheckItems from '../../hooks/useCheckItems';
import { getGoals, getManagers } from '../../utils/listGroupingUtils';
import ListViewToolbar from '../../components/ListView/ListViewToolbar';
import { useModalActions, useModalInfo } from '../../hooks/useModal';
import Modal from '../../components/Modal/Modal';

/*
  추후 더미데이터 대신 실제 api 명세서 참고하여 수정 예정
*/
const dummyIssues: Partial<IssueItemProps>[] = [
  {
    issueId: 'Veco-i1',
    issueTitle: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
    status: STATUS_CODES[0],
    priority: PRIORITY_CODES[3],
    //goalTitle: '기획 및 요구사항 분석',
    //deadline: '25.05.02',
    manage: '이가을',
  },
  {
    issueId: 'Veco-i2',
    issueTitle: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
    status: STATUS_CODES[1],
    // priority: PRIORITY_CODES[2],
    // goalTitle: '기획 및 요구사항 분석',
    deadline: '25.05.02',
    manage: '박유민',
  },
  {
    issueId: 'Veco-i3',
    issueTitle: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
    status: 'TODO',
    priority: PRIORITY_CODES[3],
    goalTitle: '기획 및 요구사항 분석',
    deadline: '25.05.02',
    // manage: '박유민',
  },
  {
    issueId: 'Veco-i4',
    issueTitle: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
    status: STATUS_CODES[3],
    priority: PRIORITY_CODES[0],
    goalTitle: '개발 및 배포',
    deadline: '25.05.01-25.05.02',
    manage: '김선화',
  },
  {
    issueId: 'Veco-i5',
    issueTitle: '기능 정의: 구현할 핵심 기능과 부가 기능 목록화',
    status: STATUS_CODES[0],
    priority: PRIORITY_CODES[0],
    goalTitle: '없음 ',
    deadline: '없음 ',
    manage: '없음 ',
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
        <ListViewToolbar
          filter={filter}
          isDeleteMode={isDeleteMode}
          isAllChecked={isAllChecked}
          showSelectAll={grouped.some(({ items }) => items.length > 0)}
          filterOptions={['상태', '우선순위', '담당자', '목표']}
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
