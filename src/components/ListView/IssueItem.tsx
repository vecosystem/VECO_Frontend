import type { IssueItemProps } from '../../types/listItem';
import dateIcon from '../../assets/icons/date.svg';
import grayIcon from '../../assets/icons/gray.svg';
import goalIcon from '../../assets/icons/goal.svg';
import issueIcon from '../../assets/icons/issue.svg';
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
  goalTitle: '기획 및 요구사항 분석',
  status: '완료',
  priority: '보통',
  deadline: '2025-07-01',
  manage: '김선화',
  filter: 'manage', // 'status' | 'priority' | 'manage'
};

export const IssueItem = (props: Partial<IssueItemProps>) => {
  const {
    showCheckbox,
    checked,
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

  return (
    <div
      className={`font-body-r flex justify-between items-center h-[5.6rem] px-[3.2rem] -mx-[3.2rem] ${checked ? 'bg-gray-300' : ''}`}
    >
      <div className="flex items-center">
        {/* 이슈 번호 */}
        {showCheckbox ? (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={checked}
              // onChange={() => {}} // 외부에서 상태 관리 필요
              className="w-[1.2rem] mr-[1.0rem] accent-primary-blue"
              aria-label="이슈 선택"
            />
            <span className="font-body-sb">{issueId}</span>
          </div>
        ) : (
          <span className="font-body-sb ml-[2.4rem]">{issueId}</span>
        )}
        <div className="flex gap-[0.8rem] items-center">
          {/* 이슈 아이콘 */}
          <img src={issueIcon} alt="date" className="w-[1.8rem] h-[1.8rem] ml-[1.6rem]" />
          {/* 이슈명 */}
          <div className="truncate">{issueTitle}</div>
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
            <div className="truncate">{priority}</div>
          </div>
        )}
        <div className="flex gap-[0.8rem] items-center">
          {/* 목표 아이콘 */}
          <img src={goalIcon} alt="date" className="w-[1.8rem] h-[1.8rem] ml-[1.6rem]" />
          {/* 목표명 */}
          <div className="truncate">{goalTitle}</div>
        </div>

        {/* 기한 */}
        <div className="flex gap-[0.8rem] items-center">
          <img src={dateIcon} alt="date" className="w-[1.8rem] h-[1.8rem]" />
          <div className="truncate">{deadline}</div>
        </div>
        {/* 담당자/팀명 */}
        {/*
         * 담당자 1인 기준으로 작성
         * 프로필 이미지, 고유 색상 등 추가 예정
         */}
        {displayFields.includes('manage') && (
          <div className="flex gap-[0.8rem] items-center">
            <img
              src={type === 'issue' ? grayIcon : grayIcon}
              alt="manage"
              className="w-[1.8rem] h-[1.8rem]"
            />
            <div>{manage}</div>
          </div>
        )}
      </div>
    </div>
  );
};
