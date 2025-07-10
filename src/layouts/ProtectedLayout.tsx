import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

const ProtectedLayout = () => {
  return (
    <div className="flex h-screen">
      <aside className="overflow-auto scrollbar">
        <Sidebar />
      </aside>
      <main className="flex-1 min-w-0 p-[3.2rem] overflow-auto scrollbar">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
