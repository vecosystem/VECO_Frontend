// src/components/DropdownMenu.jsx
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
  initialOpen = true, // 기본적으로 열려있도록 설정
  children,
  headerTeamIcon,
  headerHasToggleIcon = true,
  isNested = false,
  dragHandle,
}: DropdownMenuProps) => {
  const { dropdownOpen, toggleDropdown, setDropdownOpen } = useUIStore();

  // 스토어에 초기값이 없으면 initialOpen 값으로 설정
  if (dropdownOpen[dropdownId] === undefined) {
    setDropdownOpen(dropdownId, initialOpen);
  }

  const isOpen = dropdownOpen[dropdownId] ?? initialOpen;

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
