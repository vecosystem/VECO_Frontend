import CheckedIcon from '../../assets/icons/check-box-o.svg';
import UncheckedIcon from '../../assets/icons/check-box-x.svg';

interface CheckboxProps {
  checked: boolean;
  onCheckChange?: (checked: boolean) => void;
}

const SelectAllCheckbox = ({ checked, onCheckChange }: CheckboxProps) => {
  const handleItemClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('label')) return;
    onCheckChange?.(!checked);
  };

  return (
    <div
      className="flex items-center whitespace-nowrap"
      onClick={handleItemClick}
      style={{ cursor: 'pointer' }}
    >
      <label className="relative flex items-center cursor-pointer mr-[0.8rem]">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckChange?.(e.target.checked)}
          className="peer absolute w-[1.6rem] h-[1.6rem] opacity-0 cursor-pointer"
          tabIndex={-1}
        />
        <img
          src={checked ? CheckedIcon : UncheckedIcon}
          className="w-[1.6rem] h-[1.6rem] pointer-events-none"
        />
      </label>
      <span className={`font-small-b ${checked ? 'text-primary-variant-blue' : 'text-gray-400'}`}>
        전체선택
      </span>
    </div>
  );
};

export default SelectAllCheckbox;
