import { Outlet, useLocation, Navigate, useNavigationType } from 'react-router-dom';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import Loading from '../pages/Loading.tsx';
import ServerError from '../pages/ServerError.tsx';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import onboardingSteps from '../constants/onboardingSteps';

const PublicLayout = () => {
  const location = useLocation();
  const navType = useNavigationType();
  const { getItem: getInviteUrl } = useLocalStorage(LOCAL_STORAGE_KEY.inviteUrl);
  const { getItem: getInvitePassword } = useLocalStorage(LOCAL_STORAGE_KEY.invitePassword);
  const { getItem: getIsInvite } = useLocalStorage(LOCAL_STORAGE_KEY.isInvite);

  // 온보딩 경로 중 `/onboarding`(0단계) 제외, 1~3단계 경로만 보호
  const guardedPaths = onboardingSteps.slice(1);
  const needsCheck = guardedPaths.includes(location.pathname);
  const isManualOrHistoryNav = location.key === 'default' || navType === 'POP';
  const inviteUrl = needsCheck && isManualOrHistoryNav ? getInviteUrl() : null;
  const invitePassword = needsCheck && isManualOrHistoryNav ? getInvitePassword() : null;
  const isInvite = getIsInvite();
  const ONBOARDING_STATUS_KEY = 'onboarding-status';
  const hasOnboardingStatus =
    needsCheck && isManualOrHistoryNav && localStorage.getItem(ONBOARDING_STATUS_KEY) !== null;

  // 리다이렉트
  if (
    needsCheck &&
    isManualOrHistoryNav &&
    (!inviteUrl || !invitePassword || isInvite || hasOnboardingStatus)
  ) {
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
