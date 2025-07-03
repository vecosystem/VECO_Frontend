import { PlusIcon } from 'lucide-react';
// TODO: 아이콘 디자인팀 피드백 후 수정 예정

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  onAddClick?: () => void;
}

const SidebarItem = ({ icon, label, onClick, onAddClick }: SidebarItemProps) => {
  return (
    <div className="flex w-full items-center self-stretch">
      {/* TODO: pxr 적용 예정 */}
      <button
        onClick={onClick}
        type="button"
        className="flex grow items-center gap-[0.8rem] cursor-pointer"
      >
        <span className="w-[2.4rem] h-[2.4rem] shrink-0 aspect-square">{icon}</span>
        {/* TODO: 전역 스타일 적용 예정 */}
        <span className="font-small-r text-gray-600 letter-spacing-[0.028rem]">{label}</span>
      </button>
      {onAddClick && (
        <button onClick={onAddClick} type="button" className="cursor-pointer">
          <PlusIcon className="w-[24px] h-[24px] aspect-square" />
        </button>
      )}
    </div>
  );
};

export default SidebarItem;
