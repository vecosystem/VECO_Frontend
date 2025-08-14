import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import SettingSidebar from '../components/Sidebar/SettingSidebar';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Loading from '../pages/Loading.tsx';
import ServerError from '../pages/ServerError.tsx';
import { LOCAL_STORAGE_KEY } from '../constants/key.ts';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { useUIStore } from '../stores/ui.ts';
import { SIDEBAR_WIDTH } from '../constants/sidebar';

const ProtectedLayout = () => {
  const location = useLocation();
  const isSettingRoute = location.pathname.startsWith('/workspace/setting');

  const { getItem: getAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { getItem: getInviteUrl } = useLocalStorage(LOCAL_STORAGE_KEY.inviteUrl);
  const isLoggedIn = !!getAccessToken() && !!getInviteUrl();
  const { sidebarOpen } = useUIStore();

  if (!isLoggedIn) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ServerError}>
          <Suspense fallback={<Loading />}>
            <div className="flex h-screen">
              <aside
                className="fixed top-0 left-0 h-screen overflow-auto sidebar-scroll transition-all duration-300 ease-in-out"
                style={{ width: sidebarOpen ? SIDEBAR_WIDTH.FULL : SIDEBAR_WIDTH.MINI }}
              >
                {isSettingRoute ? <SettingSidebar /> : <Sidebar />}
              </aside>
              <main
                className="flex flex-1 overflow-auto basic-scroll transition-all duration-300 ease-in-out"
                style={{ paddingLeft: sidebarOpen ? SIDEBAR_WIDTH.FULL : SIDEBAR_WIDTH.MINI }}
              >
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
