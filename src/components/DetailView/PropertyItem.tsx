/**
 * PropertyItem.tsx
 * 상세페이지 내 속성 항목 컴포넌트
 *
 * @description
 * - 속성 항목 수정은 상세페이지 내의 작성 완료 버튼 클릭 여부에 영향을 받지 않음. (즉, 속성은 언제나 수정 가능함)
 * - 이 컴포넌트를 활용하는 속성 항목: '상태', '우선순위'
 */

import { useEffect, useMemo, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';

interface PropertyItemProps {
  defaultValue?: string; // 최상단 고정 텍스트
  options: string[]; // 드롭다운에 표시할 옵션들
  iconMap?: Record<string, string>; // 옵션과 아이콘 이미지 매핑
  getColor?: (value: string) => string; // '상태' 속성의 아이콘 색상 매핑
  onSelect?: (label: string) => void; // 부모에 선택 라벨 전달
  selected?: string;
  placeholderLabels?: string[];
}

const PropertyItem = ({
  defaultValue,
  options,
  iconMap,
  getColor,
  onSelect,
  selected,
  placeholderLabels = [],
}: PropertyItemProps) => {
  // 제어/비제어 판단
  const isControlled = selected !== undefined;

  // 비제어일 때만 내부 상태 사용
  const [internalValue, setInternalValue] = useState<string>('');
  const [hasSelected, setHasSelected] = useState<boolean>(
    Boolean(selected && !placeholderLabels.includes(selected))
  );

  // selected prop 변경 시 내부 상태 동기화
  useEffect(() => {
    if (!isControlled) return;
    const value = selected ?? '';
    setInternalValue(value);
    setHasSelected(Boolean(value && !placeholderLabels.includes(value)));
  }, [isControlled, selected, placeholderLabels]);

  const currentValue = isControlled ? (selected ?? '') : internalValue;

  // placeholder로 간주되면 표시용/아이콘용 값은 공백 취급
  const isPlaceholder = !currentValue || placeholderLabels.includes(currentValue);
  const effectiveValue = isPlaceholder ? '' : currentValue;

  const currentIcon = useMemo(() => {
    if (!iconMap) return undefined;
    return iconMap[currentValue];
  }, [iconMap, currentValue]);

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    if (!isControlled) setInternalValue(option);
    setHasSelected(!placeholderLabels.includes(option));
    setIsOpen(false);
    onSelect?.(option);
  };

  // 속성 항목 텍스트 표시: 선택 전(또는 placeholder면) defaultValue, 아니면 선택값
  const displayText =
    hasSelected && !isPlaceholder && effectiveValue ? effectiveValue : (defaultValue ?? '');

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`flex w-full h-[3.2rem] px-[0.5rem] rounded-md items-center gap-[0.8rem] mb-[1.6rem] whitespace-nowrap hover:bg-gray-200 cursor-pointer`}
    >
      {/* 속성 아이콘 */}
      {getColor ? (
        <div className="w-[2.4rem] h-[2.4rem] flex items-center justify-center">
          <span
            className="rounded-full w-[1.6rem] h-[1.6rem]"
            style={{ backgroundColor: getColor(currentValue || '') }}
          />
        </div>
      ) : currentIcon ? (
        <img src={currentIcon} alt={currentValue} />
      ) : null}

      {/* 속성 이름 */}
      <div className={`flex relative`}>
        {/* 속성 항목명 */}
        <p className="font-body-r text-gray-600 max-w-[27.4rem] truncate">{displayText}</p>

        {/* 드롭다운 오픈 */}
        {isOpen && (
          <Dropdown
            value={currentValue}
            defaultValue={defaultValue}
            options={options}
            onSelect={handleSelect}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyItem;
