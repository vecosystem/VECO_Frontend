import { useNavigate } from 'react-router-dom';

// 버튼 컴포넌트가 받을 props 타입 정의
interface PrimaryButtonProps {
  text: string; // 버튼에 표시할 텍스트
  to?: string; // 이동할 경로 (선택)
  onClick?: () => void; // 클릭 시 실행할 사용자 정의 함수 (선택)
  disabled?: boolean; // 버튼 비활성화 여부 (기본값 false)
  className?: string; // 추가적인 커스텀 클래스 (선택)
}

// PrimaryButton 컴포넌트 정의
const PrimaryButton = ({
  text,
  to,
  onClick,
  disabled = false,
  className = '',
}: PrimaryButtonProps) => {
  const navigate = useNavigate(); // 라우팅을 위한 navigate 함수 생성

  // 버튼 클릭 시 실행될 함수
  const handleClick = () => {
    if (disabled) return; // 비활성화 상태면 클릭 무시
    if (onClick) onClick(); // 사용자 정의 onClick 함수 실행
    if (to) navigate(to); // to가 있으면 해당 경로로 이동
  };

  // 공통으로 적용되는 버튼 스타일
  const baseClass =
    'w-[40rem] h-[6.2rem] font-title-sub-r text-gray-100 text-center rounded-[0.5rem]';

  // 활성화 상태일 때 배경색
  const enabledClass = 'bg-primary-blue';

  // 비활성화 상태일 때 배경색
  const disabledClass = 'bg-gray-300';

  return (
    <button
      onClick={handleClick} // 클릭 시 handleClick 실행
      disabled={disabled} // HTML 비활성화 속성 반영
      className={`
        ${baseClass} // 기본 스타일
        ${disabled ? disabledClass : enabledClass} // 상태에 따라 배경색 변경
        ${className} // 외부에서 넘긴 추가 클래스 병합
      `}
    >
      {text} {/* 버튼 내부에 텍스트 출력 */}
    </button>
  );
};

export default PrimaryButton;
