import plusIcon from '../../assets/icons/plus.svg';

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
        className="flex grow items-center gap-[0.8rem] hover:bg-gray-200 rounded-xl cursor-pointer"
      >
        <span className="w-[2.4rem] h-[2.4rem] shrink-0 aspect-square">{icon}</span>
        <span className="font-small-r text-gray-600 letter-spacing-[0.028rem]">{label}</span>
      </button>
      {onAddClick && (
        <button onClick={onAddClick} type="button" className="cursor-pointer">
          <img src={plusIcon} alt="Add" className="w-[2.4rem] h-[2.4rem] aspect-square hover:bg-gray-200 rounded-full" />
        </button>
      )}
    </div>
  );
};

export default SidebarItem;
