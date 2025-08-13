import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import Loading from '../pages/Loading.tsx';
import ServerError from '../pages/ServerError.tsx';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';

const PublicLayout = () => {
  const location = useLocation();

  const { getItem: getInviteUrl } = useLocalStorage(LOCAL_STORAGE_KEY.inviteUrl);
  const { getItem: getInvitePassword } = useLocalStorage(LOCAL_STORAGE_KEY.invitePassword);

  // 체크해야 하는 경로들
  const guardedPaths = ['/onboarding/invite', '/onboarding/fin', '/onboarding/workspace'];
  const needsCheck = guardedPaths.includes(location.pathname);

  // 로컬스토리지 값 캐싱 (호출 1회)
  const inviteUrl = needsCheck ? getInviteUrl() : null;
  const invitePassword = needsCheck ? getInvitePassword() : null;

  // 조건 불충족 시 즉시 리다이렉트
  if (needsCheck && (!inviteUrl || !invitePassword)) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ServerError}>
          <Suspense fallback={<Loading />}>
            <main className="w-full h-screen overflow-auto basic-scroll bg-gray-onboard">
              <div className="min-w-max min-h-screen flex flex-col items-center justify-center">
                <Outlet />
              </div>
            </main>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default PublicLayout;
