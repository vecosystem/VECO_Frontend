import { useState } from 'react';
import { useDropdownActions } from '../../hooks/useDropdown.ts';
import useDropdownRef from '../../hooks/useDropdownRef.ts';
import IcDownArrow from '../../assets/icons/down-arrow.svg';
import { formatDate, toFormattedDate } from '../../utils/dateFormat.ts';
import CalendarInput from './CalendarInput.tsx';
import './react-calendar.css';

interface CalendarDropdownProps {
  onSelect: (dates: [string | null, string | null]) => void;
}

const CalendarDropdown = (props: CalendarDropdownProps) => {
  const { closeDropdown } = useDropdownActions();
  const dropdownRef = useDropdownRef(closeDropdown);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isStartActive, setIsStartActive] = useState(false);
  const [isEndActive, setIsEndActive] = useState(true);

  const handleStartClick = () => {
    if (!isStartActive) {
      setIsStartActive(!isStartActive);

      const today = new Date();
      let nextStartDate = today;
      let nextEndDate = endDate;

      if (!startDate) {
        setStartDate(today);
        nextStartDate = today;
      }

      // 종료일 보정: 시작일이 더 늦으면 종료일을 시작일로 맞춤
      if (!endDate || endDate < nextStartDate) {
        setEndDate(nextStartDate);
        nextEndDate = nextStartDate;
      }

      props.onSelect([toFormattedDate(nextStartDate), toFormattedDate(nextEndDate)]);
    }
  };

  const handleEndClick = () => {
    if (!isEndActive) {
      setIsEndActive(!isEndActive);

      let nextStartDate = startDate;
      let nextEndDate = endDate;

      // 종료일은 이미 있음. 시작일이 없거나 종료일보다 늦으면 보정
      if (!startDate || (endDate && startDate > endDate)) {
        setStartDate(endDate);
        nextStartDate = endDate;
      }

      props.onSelect([toFormattedDate(nextStartDate), toFormattedDate(nextEndDate)]);
    }
  };

  const handleStartChange = (date: Date) => {
    setStartDate(date);

    if (endDate && endDate < date) {
      setEndDate(date);
    }

    props.onSelect([formatDate(date), toFormattedDate(endDate)]);
  };

  const handleEndChange = (date: Date) => {
    setEndDate(date);

    let newStart = startDate;
    if (!startDate || startDate > date) {
      newStart = date;
      setStartDate(date);
    }

    props.onSelect([toFormattedDate(newStart), formatDate(date)]);
  };

  return (
    <div
      ref={dropdownRef}
      style={{ boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)' }}
      className={`absolute z-30 top-0 left-0 flex flex-col min-w-[23.2rem] w-auto
      border border-gray-400 bg-white rounded-[0.4rem]`}
    >
      <div
        className={`flex border-b border-gray-200 justify-between items-center py-[0.4rem] ps-[1.2rem] pe-[0.8rem]`}
        onClick={closeDropdown}
      >
        <span className={`font-xsmall-r text-gray-600 me-[0.4rem]`}>기한</span>
        <img src={IcDownArrow} alt={'기한'} />
      </div>
      <section className={`grid grid-cols-2`}>
        <CalendarInput
          isActive={isStartActive}
          label="시작일"
          selectedDate={startDate}
          onChange={handleStartChange}
          onClick={handleStartClick}
        />
        <CalendarInput
          isActive={isEndActive}
          label="종료일"
          selectedDate={endDate}
          onChange={handleEndChange}
          onClick={handleEndClick}
        />
      </section>
    </div>
  );
};

export default CalendarDropdown;
