import { useNavigate } from 'react-router-dom';

interface PrimaryButtonProps {
  text: string;
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const PrimaryButton = ({
  text,
  to,
  onClick,
  disabled = false,
  className = '',
}: PrimaryButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
    if (to) navigate(to);
  };

  const baseClass =
    'w-[40rem] h-[6.2rem] font-title-sub-r text-gray-100 text-center rounded-[0.5rem]';
  const enabledClass = 'bg-primary-blue cursor-pointer hover:opacity-90';
  const disabledClass = 'bg-gray-300';

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${baseClass} 
        ${disabled ? disabledClass : enabledClass} 
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
