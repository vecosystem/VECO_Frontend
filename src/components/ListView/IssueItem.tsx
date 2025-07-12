import type { IssueItemProps } from '../../types/listItem';
import dateIcon from '../../assets/icons/date.svg';
import grayIcon from '../../assets/icons/gray.svg';
import goalIcon from '../../assets/icons/goal.svg';
import issueIcon from '../../assets/icons/issue.svg';
import CheckedIcon from '../../assets/icons/check-box-o.svg';
import UncheckedIcon from '../../assets/icons/check-box-x.svg';
import { getFilter, getPriorityIcon, getStatusIcon } from '../../utils/listItemUtils';

/*
 * 기본값 설정, props 로 전달된 값이 없을 경우 사용
 * 추후 백엔드 명세서 확인 후 변수명 등 수정 예정
 */
const defaultData: IssueItemProps = {
  showCheckbox: true,
  checked: false,
  type: 'issue', // 'issue' | 'my-issue'
  issueId: 'Veco-i3',
  issueTitle: '백호를 사용해서 다른 사람들과 협업해보기',
  status: '완료',
  priority: '보통',
  manage: '없음',
  filter: '담당자', // '상태' | '우선순위' | '담당자' | '목표'
};

export const IssueItem = (props: Partial<IssueItemProps>) => {
  const {
    showCheckbox,
    checked,
    onCheckChange,
    type,
    issueId,
    issueTitle,
    goalTitle,
    status,
    priority,
    deadline,
    manage,
    filter,
  } = {
    ...defaultData,
    ...props,
  };

  const displayFields = getFilter(filter);

  const handleItemClick = (e: React.MouseEvent) => {
    if (!showCheckbox) return;
    if ((e.target as HTMLElement).closest('label')) return;
    onCheckChange?.(!checked);
  };

  return (
    <div
      className={`font-body-r flex justify-between items-center min-w-[110rem] h-[5.6rem] px-[3.2rem] -mx-[3.2rem] ${showCheckbox && checked ? 'bg-gray-300' : ''}`}
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
            <span className="font-body-b whitespace-nowrap">{issueId}</span>
          </div>
        ) : (
          <span className="font-body-b ml-[2.4rem] whitespace-nowrap">{issueId}</span>
        )}
        <div className="flex gap-[0.8rem] items-center">
          {/* 이슈 아이콘 */}
          <img src={issueIcon} alt="date" className="w-[2.4rem] h-[2.4rem] ml-[1.6rem]" />
          {/* 이슈명 */}
          <div className="truncate min-w-0 flex-1">{issueTitle}</div>
        </div>
      </div>
      <div className="flex gap-[3.2rem] items-center">
        {/* 상태 */}
        {displayFields.includes('status') && (
          <div className="flex gap-[0.8rem] items-center">
            {getStatusIcon(status)}
            <div className="truncate">{status}</div>
          </div>
        )}
        {/* 우선순위 */}
        {displayFields.includes('priority') && (
          <div className="flex gap-[0.8rem] items-center">
            <img src={getPriorityIcon(priority)} alt={priority} className="w-[2.4rem] h-[2.4rem]" />
            <div className="whitespace-nowrap">{priority}</div>
          </div>
        )}
        {displayFields.includes('goal') && goalTitle && goalTitle !== '없음' && (
          <div className="flex gap-[0.8rem] items-center">
            {/* 목표 아이콘 */}
            <img src={goalIcon} alt="date" className="w-[2.4rem] h-[2.4rem]" />
            {/* 목표명 */}
            <div className="truncate">{goalTitle}</div>
          </div>
        )}

        {/* 기한 */}
        {deadline && deadline !== '없음' && (
          <div className="flex gap-[0.8rem] items-center whitespace-nowrap">
            <img src={dateIcon} alt="date" className="w-[1.6rem] h-[1.6rem] m-[0.4rem]" />
            <div className="">{deadline}</div>
          </div>
        )}
        {/* 담당자/팀명 */}
        {/*
         * 담당자 1인 기준으로 작성
         * 프로필 이미지, 고유 색상 등 추가 예정
         */}
        {displayFields.includes('manage') && (
          <div className="flex gap-[0.8rem] items-center whitespace-nowrap">
            <img
              src={type === 'issue' ? grayIcon : grayIcon}
              alt="manage"
              className="w-[2.0rem] h-[2.0rem]"
            />
            <div>{manage}</div>
          </div>
        )}
      </div>
    </div>
  );
};
