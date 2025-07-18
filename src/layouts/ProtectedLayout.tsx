import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

const ProtectedLayout = () => {
  return (
    <div className="flex h-screen">
      <aside className="overflow-auto sidebar-scroll">
        <Sidebar />
      </aside>
      <main className="flex flex-1 min-w-0 p-[3.2rem] overflow-auto basic-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
