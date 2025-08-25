import { useNavigate } from 'react-router-dom';

interface PageIndicatorProps {
  currentStep: number;
  steps: string[];
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

        const baseStyle = `
          transition-all
          ${isActive ? 'w-[3.2rem] bg-primary-blue' : 'w-[0.8rem] bg-gray-300'}
          h-[0.8rem] rounded-full
        `;

        const cursorStyle = isPast
          ? 'cursor-pointer hover:opacity-80'
          : isActive
            ? 'cursor-default'
            : 'cursor-not-allowed';

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
