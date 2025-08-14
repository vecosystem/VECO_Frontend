/**
 * MultiSelectPropertyItem.tsx
 * 상세페이지 내 (다중 옵션 가능한) 속성 항목 컴포넌트
 *
 * @description
 * - 속성 항목 수정은 상세페이지 내의 작성 완료 버튼 클릭 여부에 영향을 받지 않음. (즉, 속성은 언제나 수정 가능함)
 * - 이 컴포넌트를 활용하는 속성 항목: '담당자', '이슈'
 */

import { useMemo, useState } from 'react';
import IcIssue from '../../assets/icons/issue.svg';
import IcProfile from '../../assets/icons/user-circle-sm.svg';
import MultiSelectDropdown from '../Dropdown/MultiSelectDropdown';
import ArrowDropdown from '../Dropdown/ArrowDropdown';

interface MultiPropertyItemProps {
  defaultValue: string; // 헤더 텍스트 (예: '담당자')
  options: string[]; // 옵션 목록
  iconMap?: Record<string, string>; // 옵션명 -> 아이콘
  displayText?: (values: string[]) => React.ReactNode; // 표시 텍스트 커스터마이즈 (선택 1개/다수)
  onChange?: (labels: string[]) => void; // 부모에 선택 배열 전달
}

/** 담당자 텍스트 표시 포맷:
 * - 0명: '담당자'
 * - 1~4명: 전원 표시
 * - 5명+: 앞 4명 + '외 n명'
 */
const getManagerDisplay = (fallbackLabel: string) => (values: string[]) => {
  const count = values.length;
  if (count === 0) return fallbackLabel;
  if (count <= 4) {
    return (
      <div className="flex items-center min-w-0 max-w-[27.4rem]">
        <span className="text-gray-600 truncate">{values.join(', ')}</span>
      </div>
    );
  }
  const shown = values.slice(0, 4).join(', ');
  const rest = count - 4;
  return (
    <div className="flex items-center min-w-0 gap-2 max-w-[27.4rem]">
      <span className="text-gray-600 truncate">{shown}</span>
      <span className="flex-shrink-0 text-gray-500">외 {rest}명</span>
    </div>
  );
};

/** 이슈 텍스트 표시 포맷:
 * - 0개: '이슈'
 * - 1개: 항목명
 * - 2개+: 첫 항목 + '외 n개'
 */
const getIssueDisplay = (values: string[]) => {
  const count = values.length;
  if (count === 0) return '이슈';
  if (count === 1)
    return <span className="text-gray-600 max-w-[27.4rem] truncate block">{values[0]}</span>;
  return (
    <div className="flex items-center gap-2 max-w-[27.4rem]">
      <span className="text-gray-600 truncate block">{values[0]}</span>
      <span className="flex-shrink-0 text-gray-500"> 외 {count - 1}개</span>
    </div>
  );
};

const MultiSelectPropertyItem = ({
  defaultValue,
  options,
  iconMap,
  displayText,
  onChange,
}: MultiPropertyItemProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // 부모에도 알리고 내부 상태도 갱신하는 헬퍼
  const handleChangeSelected = (next: string[]) => {
    setSelected(next);
    onChange?.(next); // 외부로 변경사항 알림
  };

  // 표시할 속성 텍스트
  const renderDisplay = useMemo(() => {
    if (defaultValue === '이슈') return getIssueDisplay;
    return getManagerDisplay(defaultValue || '담당자');
  }, [displayText, defaultValue]);

  // 표시할 아이콘
  const renderIcon = () => {
    // '이슈' 항목 아이콘 렌더링
    if (defaultValue === '이슈') {
      return <img src={IcIssue} alt="이슈" />;
    }

    // '담당자' 항목 아이콘 렌더링
    if (defaultValue === '담당자') {
      const count = selected.length;
      if (count === 0) {
        // 기본 아이콘(있는 경우)
        const fallback = iconMap?.[defaultValue] ?? IcProfile;
        return <img src={fallback} alt="담당자" className="w-[1.8rem] h-[1.8rem] rounded-full" />;
      }
      if (count === 1) {
        const src = iconMap?.[selected[0]] ?? IcProfile;
        return <img src={src} alt={selected[0]} className="w-[1.8rem] h-[1.8rem] rounded-full" />;
      }
      // 2명 이상: 앞 두 명 겹쳐 표시
      const a = selected[0];
      const b = selected[1];
      const srcA = iconMap?.[a] ?? IcProfile;
      const srcB = iconMap?.[b] ?? IcProfile;
      return (
        <div className="flex -space-x-1 items-center">
          <img src={srcA} alt={a} className="w-[1.8rem] h-[1.8rem] rounded-full z-20" />
          <img
            src={srcB}
            alt={b}
            className="w-[1.6rem] h-[1.6rem] rounded-full -ml-[0.4rem] z-10"
          />
        </div>
      );
    }

    // 기타 라벨: iconMap에서 기본 라벨 아이콘 또는 생략
    const src = iconMap?.[defaultValue];
    return src ? <img src={src} alt={defaultValue} /> : null;
  };

  return (
    <div
      onClick={() => setIsOpen((v) => !v)}
      className="flex w-full h-[3.2rem] px-[0.5rem] rounded-md items-center gap-[0.8rem] mb-[1.6rem] whitespace-nowrap hover:bg-gray-200 cursor-pointer"
    >
      {/* 아이콘 */}
      {renderIcon()}

      {/* 텍스트 + 드롭다운 */}
      <div className="relative flex items-center max-w-[27.4rem] gap-[0.4rem]">
        <div className="font-body-r flex items-center min-w-0 max-w-[27.4rem]">
          {renderDisplay(selected)}
        </div>

        {isOpen && (
          <>
            {defaultValue === '이슈' ? (
              <ArrowDropdown
                defaultValue="이슈"
                selected={selected} // 단일 선택 로직
                options={options}
                onChangeSelected={handleChangeSelected}
                onClose={() => setIsOpen(false)}
              />
            ) : (
              <MultiSelectDropdown
                selected={selected}
                defaultValue={defaultValue}
                options={options}
                onChangeSelected={handleChangeSelected}
                onClose={() => setIsOpen(false)} // 바깥 클릭에서만 닫힘
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MultiSelectPropertyItem;
