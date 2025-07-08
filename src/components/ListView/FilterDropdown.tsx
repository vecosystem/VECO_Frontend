import { useRef, useEffect } from 'react';
import CheckIcon from '../../assets/icons/check.svg'; // 체크 아이콘 경로 맞게!

export interface FilterOption {
  type: 'status' | 'priority' | 'manage';
  label: string;
}

interface FilterDropdownProps {
  options: readonly FilterOption[];
  value: FilterOption['type'];
  onChange: (type: FilterOption['type']) => void;
  show: boolean;
  setShow: (v: boolean) => void;
  buttonRef: React.RefObject<HTMLDivElement | null>;
}

export const FilterDropdown = ({
  options,
  value,
  onChange,
  show,
  setShow,
  buttonRef,
}: FilterDropdownProps) => {
  // 바깥 클릭 시 닫기 (중복 로직 방지, 필요하면 부모에서 관리)
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
};
