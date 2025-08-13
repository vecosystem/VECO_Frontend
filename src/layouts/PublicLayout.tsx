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

  // 새로고침 감지
  const navEntry = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined;
  const isReload = navEntry?.type === 'reload';

  // 주소창 직접 입력만 감지 (새로고침 제외)
  const isManualNav = location.key === 'default' && !isReload;

  // 직접 입력일 때만 가드 실행
  if (
    needsCheck &&
    isManualNav &&
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
