import { useUIStore } from '../../stores/ui';
import DropdownHeader from './DropdownHeader';

interface DropdownMenuProps {
  dropdownId: string; // 각 드롭다운의 고유 ID
  headerTitle: string;
  initialOpen?: boolean;
  children: React.ReactNode;
  headerTeamIcon?: string;
  headerHasToggleIcon?: boolean;
  isNested?: boolean;
  dragHandle?: React.ReactNode;
}

const DropdownMenu = ({
  dropdownId,
  headerTitle,
  initialOpen = true,
  children,
  headerTeamIcon,
  headerHasToggleIcon = true,
  isNested = false,
  dragHandle,
}: DropdownMenuProps) => {
  const isOpen = useUIStore((s) => s.dropdownOpen[dropdownId] ?? initialOpen);
  const toggleDropdown = useUIStore((s) => s.toggleDropdown);

  const handleToggle = () => {
    toggleDropdown(dropdownId);
  };

  return (
    <div className={`flex flex-col w-full`}>
      {/* headerTitle ex: 작업실, 나의 팀, Team1 */}
      <DropdownHeader
        title={headerTitle}
        isOpen={isOpen}
        onToggle={handleToggle}
        teamIcon={headerTeamIcon}
        hasToggleIcon={headerHasToggleIcon}
        isNested={isNested}
        dragHandle={dragHandle}
      />

      {isOpen && <div className="">{children}</div>}
    </div>
  );
};

export default DropdownMenu;
