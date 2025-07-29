import SidebarItem from './SidebarItem';
import DropdownMenu from './DropdownMenu';
import { useNavigate } from 'react-router-dom';
import leftArrowIcon from '../../assets/icons/left-arrow.svg';
import collapseIcon from '../../assets/icons/collapse.svg';
import vecocirclenavy from '../../assets/logos/veco-circle-logo-bg-navy.svg';
import tableHoverIcon from '../../assets/icons/table-hover.svg';
import tableIcon from '../../assets/icons/table.svg';
import usersIcon from '../../assets/icons/users.svg';
import usersHoverIcon from '../../assets/icons/users-hover.svg';
import userProfileIcon from '../../assets/icons/user-profile.svg';
import userProfileHoverIcon from '../../assets/icons/user-profile-hover.svg';

interface FullSettingSidebarContentProps {
  setExpanded: (value: boolean) => void;
}

const FullSettingSidebarContent = ({ setExpanded }: FullSettingSidebarContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-200 p-[3.2rem] min-h-screen">
      <div className="flex flex-col items-start gap-[3.2rem] self-stretch">
        <div className="flex justify-between items-center self-stretch">
          <button
            type="button"
            className="flex items-center gap-[0.8rem] cursor-pointer"
            onClick={() => {
              navigate('/workspace/team/default/issue');
            }}
          >
            <img src={leftArrowIcon} className="w-[3.2rem] h-[3.2rem]" alt="Workspace" />
            <span className="font-title-sub-b text-gray-600 letter-spacing-[-0.04rem]">홈</span>
          </button>
          <button
            type="button"
            className="flex w-[2.4rem] h-[2.4rem] items-center justify-center cursor-pointer"
            onClick={() => setExpanded(false)}
          >
            <img src={collapseIcon} alt="collapse" />
          </button>
        </div>

        <div className="flex flex-col items-start self-stretch">
          <DropdownMenu headerTitle="워크스페이스" initialOpen={true}>
            <div className="flex flex-col justify-center items-flex-start gap-[1.6rem] pb-[1.6rem]">
              <SidebarItem
                defaultIcon={<img src={vecocirclenavy} alt="Workspace Profile" />}
                label="워크스페이스 프로필"
                onClick={() => {
                  navigate('/workspace/setting');
                }}
              />
            </div>
          </DropdownMenu>
        </div>
        <div className="flex flex-col items-start self-stretch">
          <DropdownMenu headerTitle="팀" initialOpen={true}>
            <div className="flex flex-col justify-center items-start gap-[1.6rem] pb-[1.6rem]">
              <SidebarItem
                defaultIcon={<img src={tableIcon} alt="Team List" />}
                hoverIcon={<img src={tableHoverIcon} alt="Team List" />}
                label="팀 목록"
                onClick={() => {
                  navigate('/workspace/setting/team-list');
                }}
              />
              <SidebarItem
                defaultIcon={<img src={usersIcon} alt="Workspace Members" />}
                hoverIcon={<img src={usersHoverIcon} alt="Workspace Members" />}
                label="워크스페이스 멤버"
                onClick={() => {
                  navigate('/workspace/setting/team-members');
                }}
              />
            </div>
          </DropdownMenu>
        </div>
        <div className="flex flex-col items-start self-stretch">
          <DropdownMenu headerTitle="계정" initialOpen={true}>
            <div className="flex flex-col justify-center items-start gap-[1.6rem] pb-[1.6rem]">
              <SidebarItem
                defaultIcon={<img src={userProfileIcon} alt="My Profile" />}
                hoverIcon={<img src={userProfileHoverIcon} alt="My Profile" />}
                label="나의 프로필"
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

export default FullSettingSidebarContent;
