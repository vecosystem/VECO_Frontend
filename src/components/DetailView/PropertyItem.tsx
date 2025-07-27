/**
 * PropertyItem.tsx
 * 상세페이지 내 속성 항목 컴포넌트
 *
 * @todo
 * - onClick에 이벤트 전파 관련 처리 코드 반영
 * - 관련된 드롭다운 컴포넌트 수정: 일부 구성 등
 * - 화면 가로 길이 줄여도 줄어들지 않게 처리
 *
 * @description
 * - 속성 드롭다운은 작성 완료 여부에 영향을 받지 않도록 구현.
 * - 기한 드롭다운은 이 컴포넌트로 관리하지 않음 (별도로 필요한 상세페이지에서 구현)
 */

import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';

interface PropertyItemProps {
  defaultValue?: string; // 최상단 고정 텍스트
  options: string[]; // 드롭다운에 표시할 옵션들
  iconMap?: Record<string, string>; // 옵션과 아이콘 이미지 매핑
  getColor?: (value: string) => string; // '상태' 속성의 아이콘 색상 매핑
}

const PropertyItem = ({ defaultValue, options, iconMap, getColor }: PropertyItemProps) => {
  // placeholder가 options에 없는 값이라면 options[0]으로 대체
  const initialValue = defaultValue && iconMap && iconMap[defaultValue] ? defaultValue : options[0];

  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [icon, setIcon] = useState(iconMap ? iconMap[initialValue] : undefined);

  const handleSelect = (option: string) => {
    setValue(option);
    setIcon(iconMap ? iconMap[option] : undefined);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex w-full h-[3.2rem] px-[0.5rem] rounded-md items-center gap-[0.8rem] mb-[1.6rem] whitespace-nowrap hover:bg-gray-200`}
    >
      {/* 속성 아이콘 */}
      {getColor ? (
        // (1) '상태' 속성의 아이콘: 색상 원을 적용
        <div className="w-[2.4rem] h-[2.4rem] flex items-center justify-center">
          <span
            className="rounded-full w-[1.6rem] h-[1.6rem]"
            style={{ backgroundColor: getColor(value || '') }}
          />
        </div>
      ) : (
        // (2) '상태'가 아닌 다른 속성 아이콘: 아이콘 이미지 import하여 적용
        <img src={icon} alt={value} />
      )}

      {/* 속성 이름 */}
      <div className={`flex relative cursor-pointer`}>
        <span className="flex items-center" onClick={() => setIsOpen(!isOpen)}>
          {/* 속성 항목명 */}
          <div className="font-body-r text-gray-600">{value}</div>
        </span>

        {/* 속성 항목명을 눌러 드롭다운 오픈 */}
        {isOpen && (
          <Dropdown
            value={value}
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
