import {
  EXTERNAL_CODES,
  EXTERNAL_LABELS,
  PRIORITY_CODES,
  PRIORITY_LABELS,
  STATUS_CODES,
  STATUS_LABELS,
  type ExternalCode,
  type ExternalItemProps,
  type PriorityCode,
  type StatusCode,
} from '../../types/listItem';
import dateIcon from '../../assets/icons/date.svg';
import goalIcon from '../../assets/icons/goal.svg';
import externalIcon from '../../assets/icons/external.svg';
import SlackIcon from '../../assets/icons/slack.svg';
import GithubIcon from '../../assets/icons/github.svg';
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

export const ExternalItem = (props: Partial<ExternalItemProps>) => {
  const status: StatusCode =
    props.status && STATUS_CODES.includes(props.status as StatusCode)
      ? (props.status as StatusCode)
      : ('NONE' as StatusCode);

  const priority: PriorityCode =
    props.priority && PRIORITY_CODES.includes(props.priority as PriorityCode)
      ? (props.priority as PriorityCode)
      : ('NONE' as PriorityCode);

  const external: ExternalCode =
    props.externalTool && EXTERNAL_CODES.includes(props.externalTool as ExternalCode)
      ? (props.externalTool as ExternalCode)
      : ('GITHUB' as ExternalCode);

  const {
    variant = 'default',
    onItemClick,
    showCheckbox,
    checked,
    onCheckChange,
    name,
    title,
    goalTitle = '없음',
    deadline = { start: '', end: '' },
    managers = { cnt: 0, info: [] },
    externalTool = 'GITHUB',
    filter,
  } = {
    ...props,
  };

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
          {/* 외부 아이콘 */}
          <img src={externalIcon} alt="external" className="w-[2.4rem] h-[2.4rem] ml-[1.6rem]" />
          {/* 외부명 */}
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
            <img src={goalIcon} alt="date" className="w-[2.4rem] h-[2.4rem]" />
            {/* 목표명 */}
            <div className="truncate">{goalTitle}</div>
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
        {/* 외부툴 */}
        {displayFields.includes('external') && (
          <div className="flex gap-[0.8rem] items-center">
            <img
              src={externalTool === 'GITHUB' ? GithubIcon : SlackIcon}
              alt={externalTool}
              className="w-[2.4rem] h-[2.4rem]"
            />
            <div className="whitespace-nowrap">{EXTERNAL_LABELS[external]}</div>
          </div>
        )}
      </div>
    </div>
  );
};
