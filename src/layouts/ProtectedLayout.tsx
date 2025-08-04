import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import SettingSidebar from '../components/Sidebar/SettingSidebar';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Loading from '../pages/Loading.tsx';
import Error from '../pages/Error.tsx';

const ProtectedLayout = () => {
  const location = useLocation();
  const isSettingRoute = location.pathname.startsWith('/workspace/setting');
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={Error}>
          <Suspense fallback={<Loading />}>
            <div className="flex h-screen">
              <aside className="overflow-auto sidebar-scroll">
                {isSettingRoute ? <SettingSidebar /> : <Sidebar />}
              </aside>
              <main className="flex flex-1 min-w-0 overflow-auto basic-scroll">
                <Outlet />
              </main>
            </div>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ProtectedLayout;
