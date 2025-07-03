import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

const ProtectedLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
