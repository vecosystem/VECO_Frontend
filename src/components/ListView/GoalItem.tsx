import type { GoalItemProps } from '../../types/listItem';
import dateIcon from '../../assets/icons/date.svg';
import grayIcon from '../../assets/icons/gray.svg';
import goalIcon from '../../assets/icons/goal.svg';
import CheckedIcon from '../../assets/icons/check-box-o.svg';
import UncheckedIcon from '../../assets/icons/check-box-x.svg';
import { getFilter, getPriorityIcon, getStatusIcon } from '../../utils/listItemUtils';

/*
 * 기본값 설정, props 로 전달된 값이 없을 경우 사용
 * 추후 백엔드 명세서 확인 후 변수명 등 수정 예정
 */
const defaultData: GoalItemProps = {
  showCheckbox: true,
  checked: false,
  type: 'goal', // 'goal' | 'my-goal'
  goalId: 'Veco-g3',
  title: '백호를 사용해서 다른 사람들과 협업해보기',
  status: '완료',
  priority: '보통',
  deadline: '2025-07-01',
  manage: '김선화',
  filter: '우선순위', // '상태' | '우선순위' | '담당자'
};

export const GoalItem = (props: Partial<GoalItemProps>) => {
  const { showCheckbox, checked, type, goalId, title, status, priority, deadline, manage, filter } =
    {
      ...defaultData,
      ...props,
    };

  const displayFields = getFilter(filter);

  return (
    <div
      className={`font-body-r flex justify-between items-center h-[5.6rem] px-[3.2rem] -mx-[3.2rem] ${checked ? 'bg-gray-300' : ''}`}
    >
      <div className="flex items-center">
        {/* 목표 번호 */}
        {showCheckbox ? (
          <div className="flex items-center whitespace-nowrap">
            <label className="relative flex items-center cursor-pointer mr-[0.8rem]">
              <input
                type="checkbox"
                checked={checked}
                // onChange={() => {}} // 외부에서 상태 관리 필요
                className="peer absolute w-[1.6rem] h-[1.6rem] opacity-0 cursor-pointer"
                aria-label="목표 선택"
                tabIndex={-1}
              />
              <img
                src={checked ? CheckedIcon : UncheckedIcon}
                className="w-[1.6rem] h-[1.6rem] pointer-events-none"
              />
            </label>
            <span className="font-body-b whitespace-nowrap">{goalId}</span>
          </div>
        ) : (
          <span className="font-body-b ml-[2.4rem] whitespace-nowrap">{goalId}</span>
        )}
        <div className="flex gap-[0.8rem] items-center">
          {/* 목표 아이콘 */}
          <img src={goalIcon} alt="date" className="w-[1.8rem] h-[1.8rem] ml-[1.6rem]" />
          {/* 목표명 */}
          <div className="truncate max-w-[40rem]">{title}</div>
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
              src={type === 'goal' ? grayIcon : grayIcon}
              alt="manage"
              className="w-[1.8rem] h-[1.8rem]"
            />
            <div className="truncate">{manage}</div>
          </div>
        )}
      </div>
    </div>
  );
};
