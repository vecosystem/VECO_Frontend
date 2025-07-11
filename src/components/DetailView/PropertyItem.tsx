import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';

interface PropertyItemProps {
  defaultValue?: string; // 최상단 고정 텍스트
  options: string[]; // 드롭다운에 표시할 옵션들
  iconMap: Record<string, string>; // 옵션과 아이콘 이미지 매핑
}

const PropertyItem = ({ defaultValue, options, iconMap }: PropertyItemProps) => {
  // placeholder가 options에 없는 값이라면 options[0]으로 대체
  const initialValue = defaultValue && iconMap[defaultValue] ? defaultValue : options[0];

  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [icon, setIcon] = useState(iconMap[initialValue]);

  const handleSelect = (option: string) => {
    setValue(option);
    setIcon(iconMap[option]);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex w-full h-[3.2rem] px-[0.5rem] rounded-md items-center gap-[0.8rem] mb-[1.6rem] hover:bg-gray-200`}
    >
      {/* 속성 아이콘 */}
      <img src={icon} alt={value} />

      <div className={`flex relative cursor-pointer`}>
        <span className="flex items-center" onClick={() => setIsOpen((open) => !isOpen)}>
          {/* 속성 항목명 */}
          <div className="font-body-r text-gray-600">{value}</div>
        </span>

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
