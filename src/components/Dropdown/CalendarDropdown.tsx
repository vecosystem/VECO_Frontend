import { useDropdownActions } from '../../hooks/useDropdown.ts';
import useDropdownRef from '../../hooks/useDropdownRef.ts';
import IcDownArrow from '../../assets/icons/down-arrow.svg';
import IcCheck from '../../assets/icons/gray-check.svg';

interface CalendarDropdownProps {
  onSelect: (date: string) => void;
}

const CalendarDropdown = (props: CalendarDropdownProps) => {
  const { closeDropdown } = useDropdownActions();
  const dropdownRef = useDropdownRef(closeDropdown);
  return (
    <div
      ref={dropdownRef}
      style={{ boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)' }}
      className={`absolute z-30 top-0 left-0 flex flex-col w-[23.2rem]
      border border-gray-400 bg-white rounded-[0.4rem]`}
    >
      <div
        className={`flex border-b border-gray-200 justify-between items-center py-[0.4rem] ps-[1.2rem] pe-[0.8rem]`}
        onClick={closeDropdown}
      >
        <span className={`font-xsmall-r text-gray-600 me-[0.4rem]`}>기한</span>
        <img src={IcDownArrow} alt={'기한'} />
      </div>
      <section className={`grid grid-cols-2`}></section>
    </div>
  );
};

const CalendarInput = () => {
  return (
    <div className={`flex flex-col w-full`}>
      <p className={`px-[1.2rem] py-[0.75rem] font-xsmall-r text-gray-600`}>종료일</p>
      <div
        className={`flex items-center justify-start bg-gray-200 px-[1.2rem] py-[0.75rem] gap-x-[0.4rem]`}
      ></div>
      <span className={`font-xsmall-r text-gray-600`}>11월 4일</span>
      <img src={IcCheck} alt={'날짜 선택'} />
    </div>
  );
};

export default CalendarDropdown;
