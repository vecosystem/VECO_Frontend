import SidebarItem from '../components/Sidebar/SidebarItem';
import { BowArrow } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  return (
    <div className="flex">
      <SidebarItem
        icon={<BowArrow />}
        label="Sidebar Item"
        onClick={() => {}}
        onAddClick={() => {}}
      />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
