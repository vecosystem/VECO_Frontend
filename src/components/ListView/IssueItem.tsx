import {
  PRIORITY_CODES,
  PRIORITY_LABELS,
  STATUS_CODES,
  STATUS_LABELS,
  type IssueItemProps,
  type PriorityCode,
  type StatusCode,
} from '../../types/listItem';
import dateIcon from '../../assets/icons/date.svg';
import goalIcon from '../../assets/icons/goal.svg';
import issueIcon from '../../assets/icons/issue.svg';
import CheckedIcon from '../../assets/icons/check-box-o.svg';
import UncheckedIcon from '../../assets/icons/check-box-x.svg';
import {
  formatGoalDate,
  getFilter,
  getPriorityIcon,
  getStatusIcon,
} from '../../utils/listItemUtils';
import ManagerAvatar from './ManagerAvartar';

/*
 * 기본값 설정, props 로 전달된 값이 없을 경우 사용
 * 추후 백엔드 명세서 확인 후 변수명 등 수정 예정
 */

export const IssueItem = (props: Partial<IssueItemProps>) => {
  const status: StatusCode =
    props.state && STATUS_CODES.includes(props.state as StatusCode)
      ? (props.state as StatusCode)
      : ('NONE' as StatusCode);

  const priority: PriorityCode =
    props.priority && PRIORITY_CODES.includes(props.priority as PriorityCode)
      ? (props.priority as PriorityCode)
      : ('NONE' as PriorityCode);

  const {
    variant = 'default',
    onItemClick,
    showCheckbox,
    checked,
    onCheckChange,
    name,
    title,
    goal,
    deadline = { start: '', end: '' },
    managers = { cnt: 0, info: [] },
    filter,
  } = {
    ...props,
  };

  const goalTitle = goal?.title || '없음';

  const displayFields = getFilter(filter);

  const handleItemClick = (e: React.MouseEvent) => {
    if (!showCheckbox) {
      onItemClick?.(e);
      return;
    }
    if ((e.target as HTMLElement).closest('label')) return;
    onCheckChange?.(!checked);
  };

  const dateColor = variant === 'notification' ? 'text-error-400' : '';

  return (
    <div
      className={`
        font-body-r flex justify-between items-center h-[5.6rem] px-[3.2rem] -mx-[3.2rem]
        ${checked ? 'bg-gray-300' : variant === 'read' ? 'bg-gray-200' : ''}
      `}
      onClick={handleItemClick}
      tabIndex={showCheckbox ? 0 : -1}
      style={{ cursor: showCheckbox ? 'pointer' : 'default' }}
    >
      <div className="flex items-center">
        {/* 이슈 번호 */}
        {showCheckbox ? (
          <div className="flex items-center whitespace-nowrap">
            <label className="relative flex items-center cursor-pointer mr-[0.8rem]">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onCheckChange?.(e.target.checked)}
                className="peer absolute w-[1.6rem] h-[1.6rem] opacity-0 cursor-pointer"
                aria-label="목표 선택"
                tabIndex={-1}
              />
              <img
                src={checked ? CheckedIcon : UncheckedIcon}
                className="w-[1.6rem] h-[1.6rem] pointer-events-none"
              />
            </label>
            <span className="font-body-b whitespace-nowrap">{name}</span>
          </div>
        ) : (
          <span className="font-body-b ml-[2.4rem] whitespace-nowrap">{name}</span>
        )}
        <div className="flex gap-[0.8rem] items-center">
          {/* 이슈 아이콘 */}
          <img src={issueIcon} alt="date" className="w-[2.4rem] h-[2.4rem] ml-[1.6rem]" />
          {/* 이슈명 */}
          <div className="truncate min-w-0 flex-1">{title}</div>
        </div>
      </div>
      <div className="flex gap-[3.2rem] items-center">
        {/* 상태 */}
        {displayFields.includes('state') && (
          <div className="flex gap-[0.8rem] items-center">
            {getStatusIcon(status)}
            <div className="truncate">{STATUS_LABELS[status]}</div>
          </div>
        )}
        {/* 우선순위 */}
        {displayFields.includes('priority') && (
          <div className="flex gap-[0.8rem] items-center">
            <img src={getPriorityIcon(priority)} alt={priority} className="w-[2.4rem] h-[2.4rem]" />
            <div className="whitespace-nowrap">{PRIORITY_LABELS[priority]}</div>
          </div>
        )}
        {displayFields.includes('goal') && goalTitle && (
          <div className="flex gap-[0.8rem] items-center">
            {/* 목표 아이콘 */}
            <img src={goalIcon} alt="goal" className="w-[2.4rem] h-[2.4rem]" />
            {/* 목표명 */}
            <div
              className={goal?.id === -1 || goalTitle === '목표 없음' ? '' : 'truncate min-w-full'}
            >
              {goalTitle}
            </div>
          </div>
        )}

        {/* 기한 */}
        <div className="flex gap-[0.8rem] items-center whitespace-nowrap">
          <img src={dateIcon} alt="date" className="w-[1.6rem] h-[1.6rem] m-[0.4rem]" />
          <div className={dateColor}>
            {typeof deadline === 'string'
              ? formatGoalDate(deadline, deadline)
              : formatGoalDate(deadline.start, deadline.end)}
          </div>
        </div>
        {/* 담당자 */}
        {displayFields.includes('manage') && <ManagerAvatar managers={managers.info} />}
      </div>
    </div>
  );
};
