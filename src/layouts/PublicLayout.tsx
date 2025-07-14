import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <main className="w-full h-screen overflow-auto basic-scroll">
      <Outlet />
    </main>
  );
};

export default PublicLayout;
