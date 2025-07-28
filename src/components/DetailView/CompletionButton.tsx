/**
 * CompletionButton.tsx
 * 상세페이지 내 작성완료 (<-> 수정하기) 버튼 컴포넌트
 */

import IcGrayCheckSm from '../../assets/icons/check-sm.svg';
import IcWhiteCheckSm from '../../assets/icons/whitecheck.svg';
import IcWriteSm from '../../assets/icons/write.svg';

interface CompletionButtonProps {
  isTitleFilled: boolean; // 상세페이지 필수입력 조건인 제목이 입력되었는지를 따지는 플래그
  isCompleted: boolean; // 작성 완료되었는지를 따지는 플래그
  onToggle: () => void; // 작성 완료 <-> 수정하기 버튼 토글
}

const CompletionButton = ({ isTitleFilled, isCompleted, onToggle }: CompletionButtonProps) => {
  // 제목 입력이 안 됐을 때 & 작성 완료 상태가 아닐 때: 버튼 비활성화
  const isDisabled = !isTitleFilled && !isCompleted;

  const buttonLabel = isCompleted ? '수정하기' : '작성 완료';
  const cursorClass = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer';

  // 작성 완료하지 않았을 때: 배경&텍스트 색상 비활성화 상태
  // 작성 완료 시: 활성화 상태
  const bgColor = isDisabled ? 'bg-gray-200' : 'bg-primary-blue';
  const textColor = isDisabled ? 'text-gray-400' : 'text-gray-100';

  return (
    <div className="flex items-end justify-end">
      <button
        onClick={isDisabled ? undefined : onToggle}
        disabled={isDisabled}
        className={`flex items-center justify-center gap-[0.8rem] h-[3.6rem] py-[0.8rem] pl-[1.2rem] pr-[1.6rem] rounded-md ${cursorClass} ${bgColor} transition-colors duration-300 ease-in-out`}
      >
        {/* 버튼 아이콘 */}
        <img
          // (1) 제목 작성 전, '작성 완료' 버튼 비활성화 상태일 때: 회색 체크 아이콘
          // (2) 제목 작성 후, '작성 완료' 버튼 활성화된 상태일 때: 흰색 체크 아이콘
          // (3) '작성 완료' 버튼 누른 후, '수정하기' 버튼으로 토글되었을 때: 수정하기 아이콘
          src={isDisabled ? IcGrayCheckSm : isCompleted ? IcWriteSm : IcWhiteCheckSm}
          alt="확인"
        />
        {/* 버튼 내 텍스트 */}
        <div className={`font-small-b whitespace-nowrap ${textColor}`}>{buttonLabel}</div>
      </button>
    </div>
  );
};

export default CompletionButton;
