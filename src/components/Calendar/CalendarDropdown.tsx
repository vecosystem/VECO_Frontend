import { useEffect, useState } from 'react';
import { useDropdownActions } from '../../hooks/useDropdown.ts';
import useDropdownRef from '../../hooks/useDropdownRef.ts';
import IcDownArrow from '../../assets/icons/down-arrow.svg';
import CalendarInput from './CalendarInput.tsx';
import './react-calendar.css';

interface CalendarDropdownProps {
  selectedDate: [Date | null, Date | null];
  onSelect: (dates: [Date | null, Date | null]) => void;
}

const CalendarDropdown = ({ selectedDate, onSelect }: CalendarDropdownProps) => {
  const { closeDropdown } = useDropdownActions();
  const dropdownRef = useDropdownRef(() => {
    closeDropdown();
    onSelect([startDate, endDate]);
  });

  const [startDate, setStartDate] = useState<Date | null>(selectedDate[0]);
  const [endDate, setEndDate] = useState<Date | null>(selectedDate[1]);
  const [isStartActive, setIsStartActive] = useState(false);
  const [isEndActive, setIsEndActive] = useState(false);

  useEffect(() => {
    const today = new Date();
    const [start, end] = selectedDate;

    if (!start && !end) {
      setStartDate(null);
      setEndDate(today);
      setIsStartActive(false);
      setIsEndActive(true);
      return;
    }

    setStartDate(start);
    setEndDate(end);
    setIsStartActive(start !== null);
    setIsEndActive(end !== null);
  }, [selectedDate]);

  const handleStartClick = () => {
    const today = new Date();

    if (isStartActive) {
      setIsStartActive(false);
      setStartDate(null);
    } else {
      const newStart = isEndActive ? (endDate ?? today) : today;
      setIsStartActive(true);
      setStartDate(newStart);
      if (!isEndActive) {
        setIsEndActive(true);
        setEndDate(today);
      }
    }
  };

  const handleEndClick = () => {
    if (isEndActive && isStartActive) {
      // 종료일, 시작일 둘 다 활성화 상태일 때 초기화
      setIsStartActive(false);
      setIsEndActive(false);
      setStartDate(null);
      setEndDate(null);
    } else if (!isEndActive) {
      const today = new Date();
      setIsEndActive(true);
      setEndDate(today);
    } else {
      // 종료일만 활성화 상태일 때
      setIsEndActive(false);
      setEndDate(null);
    }
  };

  const handleStartChange = (date: Date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(date);
    }
  };

  const handleEndChange = (date: Date) => {
    setEndDate(date);
    if (startDate && date < startDate) {
      setStartDate(date);
    }
  };

  return (
    <div
      ref={dropdownRef}
      style={{ boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)' }}
      className={`absolute z-30 top-0 left-0 flex flex-col min-w-[23.2rem] w-auto
      border border-gray-400 bg-gray-200 rounded-[0.4rem]`}
    >
      <div
        className={`flex border-b border-gray-200 bg-white rounded-t-[0.4rem] justify-between items-center py-[0.4rem] ps-[1.2rem] pe-[0.8rem]`}
        onClick={() => {
          closeDropdown();
          onSelect([startDate, endDate]);
        }}
      >
        <span className={`font-xsmall-r text-gray-600 me-[0.4rem]`}>기한</span>
        <img src={IcDownArrow} alt={'기한'} />
      </div>
      <section className={`grid grid-cols-2`}>
        <CalendarInput
          isActive={isStartActive}
          label="시작일"
          selectedDate={startDate}
          onClick={handleStartClick}
          onChange={handleStartChange}
        />
        <CalendarInput
          isActive={isEndActive}
          label="종료일"
          selectedDate={endDate}
          onClick={handleEndClick}
          onChange={handleEndChange}
        />
      </section>
    </div>
  );
};

export default CalendarDropdown;
