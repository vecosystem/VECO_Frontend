import CheckedIcon from '../../assets/icons/check-box-o.svg';
import UncheckedIcon from '../../assets/icons/check-box-x.svg';

interface CheckboxProps {
  checked: boolean;
  onCheckChange?: (checked: boolean) => void;
}

const SelectAllCheckbox = ({ checked, onCheckChange }: CheckboxProps) => {
  return (
    <div className="flex items-center whitespace-nowrap">
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
      <span className="font-small-b text-gray-400">전체선택</span>
    </div>
  );
};

export default SelectAllCheckbox;
