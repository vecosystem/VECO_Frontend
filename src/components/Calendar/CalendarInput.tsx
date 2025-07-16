import IcCheck from '../../assets/icons/gray-check.svg';
import Calendar from 'react-calendar';
import IcLeftArrow from '../../assets/icons/calendar-left-arrow.svg';
import IcRightArrow from '../../assets/icons/calendar-right-arrow.svg';
import { formatDate } from '../../utils/dateFormat.ts';

interface CalendarInputProps {
  isActive: boolean;
  label: string;
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  onClick: () => void;
}

const CalendarInput = ({
  isActive,
  label,
  selectedDate,
  onChange,
  onClick,
}: CalendarInputProps) => {
  return (
    <div className={`flex flex-col w-full`}>
      <p
        className={`px-[1.2rem] py-[0.75rem] font-xsmall-r ${isActive ? 'text-gray-600' : 'text-gray-400'}`}
      >
        {label}
      </p>
      <div
        className={`flex items-center justify-start px-[1.2rem] py-[0.75rem] gap-x-[0.4rem] font-xsmall-r
        ${isActive ? 'bg-gray-200' : ''}`}
        onClick={onClick}
      >
        {isActive ? (
          <>
            <span className={`text-gray-600`}>{selectedDate && formatDate(selectedDate)}</span>
            <img src={IcCheck} alt={'날짜 선택'} />
          </>
        ) : (
          <span className={`text-gray-400`}>-</span>
        )}
      </div>
      <section className={`bg-gray-200 p-[0.8rem]`}>
        <Calendar
          tileClassName={({ date }) => {
            const today = new Date();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();

            const isCurrentMonth =
              date.getMonth() === currentMonth && date.getFullYear() === currentYear;

            if (!isCurrentMonth) return 'text-gray-300'; // 현재 달이 아닌 날짜는 회색으로 표시

            if (date.getDay() === 0) return 'text-red-400'; // 일요일
            if (date.getDay() === 6) return 'text-calendar-blue'; // 토요일
            return 'text-gray-600'; // 평일
          }}
          value={selectedDate}
          onChange={(value) => {
            if (value instanceof Date) onChange(value);
          }}
          tileDisabled={({ date }) => {
            const today = new Date();
            return (
              date.getMonth() !== today.getMonth() || date.getFullYear() !== today.getFullYear()
            );
          }}
          view={'month'}
          maxDetail={'month'}
          formatDay={(_, date) => date.getDate().toString()}
          prev2Label={null}
          next2Label={null}
          prevLabel={<img src={IcLeftArrow} alt={'이전 달로 이동'} />}
          nextLabel={<img src={IcRightArrow} alt={'다음 달로 이동'} />}
        />
      </section>
    </div>
  );
};

export default CalendarInput;
