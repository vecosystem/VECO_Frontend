// src/components/Onboarding/PageIndicator.tsx

import { useNavigate } from 'react-router-dom';

interface PageIndicatorProps {
  currentStep: number; // 현재 위치한 단계 (0부터 시작)
  steps: string[]; // 전체 경로 배열
}

const PageIndicator = ({ currentStep, steps }: PageIndicatorProps) => {
  const navigate = useNavigate();

  const handleClick = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      navigate(steps[stepIndex]);
    }
  };

  return (
    <div className="flex justify-center gap-[0.6rem] ">
      {steps.slice(1).map((_, idx) => {
        const stepIndex = idx + 1;

        const isActive = stepIndex === currentStep;
        const isPast = stepIndex < currentStep;

        // 바의 공통 스타일 (남색이면 길게, 회색이면 동그랗게)
        const baseStyle = `
          transition-all
          ${isActive ? 'w-[3.2rem] bg-primary-blue' : 'w-[0.8rem] bg-gray-300'}
          h-[0.8rem] rounded-full
        `;

        // 마우스 커서 조건별 스타일
        const cursorStyle = isPast
          ? 'cursor-pointer hover:opacity-80' // 이전 단계: 클릭 가능
          : isActive
            ? 'cursor-default' // 현재 단계: 기본 커서
            : 'cursor-not-allowed'; // 다음 단계: 금지 커서

        return (
          <button
            key={stepIndex}
            onClick={() => handleClick(stepIndex)}
            className={`${baseStyle} ${cursorStyle}`}
          />
        );
      })}
    </div>
  );
};

export default PageIndicator;
