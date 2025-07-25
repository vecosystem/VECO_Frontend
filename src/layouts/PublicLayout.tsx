import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <main className="w-full h-screen overflow-auto basic-scroll bg-[#F9FAFB]">
      <div className="min-w-max min-h-screen flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </main>
  );
};

export default PublicLayout;
