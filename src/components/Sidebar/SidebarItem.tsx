import PlusIcon from '../../assets/icons/plus.svg';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  onAddClick?: () => void;
}

const SidebarItem = ({ icon, label, onClick, onAddClick }: SidebarItemProps) => {
  return (
    <div className="flex w-full items-center self-stretch">
      <button
        onClick={onClick}
        type="button"
        className="flex grow items-center gap-[0.8rem] cursor-pointer"
      >
        <span className="w-[2.4rem] h-[2.4rem] shrink-0 aspect-square">{icon}</span>
        <span className="font-small-r text-gray-600 letter-spacing-[0.028rem]">{label}</span>
      </button>
      {onAddClick && (
        <button onClick={onAddClick} type="button" className="cursor-pointer">
          <img src={PlusIcon} alt="plus" className="w-[24px] h-[24px] aspect-square" />
        </button>
      )}
    </div>
  );
};

export default SidebarItem;
