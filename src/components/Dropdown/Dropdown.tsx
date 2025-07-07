import IcCheck from '../../assets/icons/check.svg';
import IcDownArrow from '../../assets/icons/down-arrow.svg';

interface DropdownProps {
  defaultValue: string;
  options: string[];
  onSelect: (value: string) => void;
}

const Dropdown = ({ defaultValue, options, onSelect }: DropdownProps) => {
  return (
    <div
      className={`absolute top-0 left-0 flex flex-col w-[11.6rem] 
      border border-gray-400 bg-white rounded-[0.4rem] shadow-lg`}
    >
      <div className={`flex justify-between items-center py-[0.4rem] ps-[1.2rem] pe-[0.8rem]`}>
        <span className={`font-xsmall-r text-gray-600 me-[0.4rem]`}>{defaultValue}</span>
        <img src={IcDownArrow} alt={defaultValue} />
      </div>
      {options.map((option) => (
        <div
          key={option}
          className={`flex group hover:bg-gray-200 py-[0.75rem] px-[1.2rem]`}
          onClick={() => onSelect(option)}
        >
          <span className={`font-xsmall-r text-gray-600 me-[0.4rem]`}>{option}</span>
          <img className={`opacity-0 group-hover:opacity-100`} src={IcCheck} alt={option} />
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
