import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <main className="w-full h-screen overflow-auto basic-scroll">
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB]">
        <Outlet />
      </div>
    </main>
  );
};

export default PublicLayout;
