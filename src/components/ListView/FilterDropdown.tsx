import { useEffect } from 'react';
import CheckIcon from '../../assets/icons/check.svg';

export interface FilterOption<T extends string = string> {
  type: T;
  label: string;
}

// 필터 드롭다운의 Props 타입 제네릭
interface FilterDropdownProps<T extends string> {
  options: readonly FilterOption<T>[]; // { type: T, label: string } 형태, 드롭다운에 표시될 배열
  value: T; // 현재 선택된 옵션의 type 값
  onChange: (type: T) => void; // 옵션 선택 시 호출되는 콜백
  show: boolean; // 드롭다운 표시 여부
  setShow: (v: boolean) => void; // 외부 상태관리
  buttonRef: React.RefObject<HTMLDivElement | null>; // 외부 클릭 감지(드롭다운 닫기)
}

export function FilterDropdown<T extends string>({
  options,
  value,
  onChange,
  show,
  setShow,
  buttonRef,
}: FilterDropdownProps<T>) {
  useEffect(() => {
    if (!show) return;
    const handler = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [show, setShow, buttonRef]);

  return show ? (
    <div
      className="absolute left-0 top-[110%] w-[11.6rem] bg-white rounded-[0.4rem] shadow-xl border border-gray-400 py-2 z-20"
      style={{ boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.15)' }}
    >
      {options.map((opt) => (
        <button
          key={opt.type}
          className={`flex items-center w-full h-[3.2rem] px-[1.2rem] text-left
            ${value === opt.type ? 'bg-gray-200' : ''} hover:bg-gray-200 transition-colors`}
          onClick={() => {
            onChange(opt.type);
            setShow(false);
          }}
          type="button"
        >
          <span className="font-xsmall-r">{opt.label}</span>
          {value === opt.type && (
            <img src={CheckIcon} className="w-[1.6rem] h-[1.6rem] ml-[0.4rem]" alt="선택됨" />
          )}
        </button>
      ))}
    </div>
  ) : null;
}
