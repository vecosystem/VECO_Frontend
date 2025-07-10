import plusIcon from '../../assets/icons/plus.svg';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  onAddClick?: () => void;
}

const SidebarItem = ({ icon, label, onClick, onAddClick }: SidebarItemProps) => {
  return (
    <div className="flex w-full height-[3.2rem] items-center self-stretch hover:bg-gray-300 rounded-[0.6rem] transition-colors duration-150 ease-in-out">
      <button
        onClick={onClick}
        type="button"
        className="flex grow items-center gap-[0.8rem] cursor-pointer"
      >
        <span className="w-[2.4rem] h-[2.4rem] shrink-0 aspect-square">{icon}</span>
        <span className="font-small-r text-gray-600 letter-spacing-[0.028rem]">{label}</span>
      </button>
      {onAddClick && (
        <button
          onClick={onAddClick}
          type="button"
          className="hover:bg-gray-400 rounded-[0.6rem] cursor-pointer transition-colors duration-150 ease-in-out"
        >
          <img src={plusIcon} alt="Add" className="w-[2.4rem] h-[2.4rem] aspect-square" />
        </button>
      )}
    </div>
  );
};

export default SidebarItem;
