import { useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import SidebarItem from './SidebarItem';
import vecocirclenavy from '../../assets/logos/veco-circle-logo-bg-navy.svg';
import tableIcon from '../../assets/icons/table.svg';
import tableHoverIcon from '../../assets/icons/table-hover.svg';
import usersIcon from '../../assets/icons/users.svg';
import usersHoverIcon from '../../assets/icons/users-hover.svg';
import userProfileIcon from '../../assets/icons/user-profile.svg';
import userProfileHoverIcon from '../../assets/icons/user-profile-hover.svg';
import leftArrowIcon from '../../assets/icons/left-arrow.svg';
import expandIcon from '../../assets/icons/expand.svg';
import type { WorkspaceResponse } from '../../types/setting';

interface MiniSettingSidebarContentProps {
  toggleSidebar: () => void;
  workspaceProfile: WorkspaceResponse;
}

const MiniSettingSidebarContent = ({
  toggleSidebar,
  workspaceProfile,
}: MiniSettingSidebarContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-200 p-[3.2rem] min-h-screen">
      <div className="flex flex-col items-start gap-[3.2rem] self-stretch">
        <div className="flex gap-[1.6rem] items-center self-stretch">
          <button
            type="button"
            className="flex w-[3.2rem] h-[3.2rem] shrink-0 items-center cursor-pointer"
            onClick={() => {
              navigate(`/workspace/team/${workspaceProfile.defaultTeamId}/issue`);
            }}
          >
            <img src={leftArrowIcon} className="w-full h-full shrink-0" alt="Workspace" />
          </button>
          <button
            type="button"
            className="flex w-[2.4rem] h-[2.4rem] shrink-0 items-center justify-center cursor-pointer"
            onClick={toggleSidebar}
          >
            <img src={expandIcon} className="w-full h-full shrink-0" alt="expand" />
          </button>
        </div>

        <div className="flex flex-col items-start self-stretch">
          <DropdownMenu dropdownId="setting-workspace" headerTitle="워크" initialOpen={true}>
            <div className="flex flex-col justify-center items-flex-start gap-[1.6rem] pb-[1.6rem]">
              <SidebarItem
                defaultIcon={workspaceProfile?.workspaceImageUrl || vecocirclenavy}
                label=""
                onClick={() => {
                  navigate('/workspace/setting');
                }}
              />
            </div>
          </DropdownMenu>
        </div>
        <div className="flex flex-col items-start self-stretch">
          <DropdownMenu dropdownId="setting-team" headerTitle="팀" initialOpen={true}>
            <div className="flex flex-col justify-center items-start gap-[1.6rem] pb-[1.6rem]">
              <SidebarItem
                defaultIcon={tableIcon}
                hoverIcon={tableHoverIcon}
                label=""
                onClick={() => {
                  navigate('/workspace/setting/team-list');
                }}
              />
              <SidebarItem
                defaultIcon={usersIcon}
                hoverIcon={usersHoverIcon}
                label=""
                onClick={() => {
                  navigate('/workspace/setting/team-members');
                }}
              />
            </div>
          </DropdownMenu>
        </div>
        <div className="flex flex-col items-start self-stretch">
          <DropdownMenu dropdownId="setting-account" headerTitle="계정" initialOpen={true}>
            <div className="flex flex-col justify-center items-start gap-[1.6rem] pb-[1.6rem]">
              <SidebarItem
                defaultIcon={userProfileIcon}
                hoverIcon={userProfileHoverIcon}
                label=""
                onClick={() => {
                  navigate('/workspace/setting/my-profile');
                }}
              />
            </div>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default MiniSettingSidebarContent;
