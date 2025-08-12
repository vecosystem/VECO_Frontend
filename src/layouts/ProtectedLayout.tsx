import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import SettingSidebar from '../components/Sidebar/SettingSidebar';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Loading from '../pages/Loading.tsx';
import ServerError from '../pages/ServerError.tsx';
import { LOCAL_STORAGE_KEY } from '../constants/key.ts';

const ProtectedLayout = () => {
  const location = useLocation();
  const isSettingRoute = location.pathname.startsWith('/workspace/setting');

  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  const isLoggedIn = !!accessToken && accessToken !== 'undefined';

  if (!isLoggedIn) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ServerError}>
          <Suspense fallback={<Loading />}>
            <div className="flex h-screen">
              <aside className="overflow-auto sidebar-scroll">
                {isSettingRoute ? <SettingSidebar /> : <Sidebar />}
              </aside>
              <main className="flex flex-1 min-w-0 min-h-max overflow-auto basic-scroll">
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
