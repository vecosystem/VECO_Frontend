interface ExternalToolButtonProps {
  label: string;
  desc: string;
  icon: string;
  iconSelected: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const ExternalToolButton = ({
  label,
  desc,
  icon,
  iconSelected,
  selected,
  onClick,
  disabled,
}: ExternalToolButtonProps) => {
  return (
    <button
      type="button"
      className={`
        flex flex-col items-start w-[24.4rem] gap-[1.2rem] p-[3.2rem] border-[0.1rem] rounded-[0.5rem] transition-colors
        hover:shadow-lg
        ${selected ? 'bg-primary-blue border-primary-blue' : 'border-gray-300 bg-white'}
        ${selected ? 'text-gray-100' : 'text-gray-900'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={disabled ? undefined : onClick}
      aria-pressed={selected}
      disabled={disabled}
    >
      <div className="flex gap-[0.8rem] items-center">
        <img src={selected ? iconSelected : icon} className="w-[3rem] h-[3rem]" alt={label} />
        <div className="font-title-sub-b">{label}</div>
      </div>
      <div className="font-xsmall-r">{desc}</div>
    </button>
  );
};

export default ExternalToolButton;
