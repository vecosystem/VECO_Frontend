import SidebarItem from '../components/Sidebar/SidebarItem';
import { Outlet } from 'react-router-dom';
import IssueIcon from '../assets/icons/issue.svg';

const ProtectedLayout = () => {
  return (
    <div className="flex">
      <SidebarItem
        icon={<img src={IssueIcon} alt="이슈" />}
        label="Sidebar Item"
        onClick={() => {}}
        onAddClick={() => {}}
      />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
