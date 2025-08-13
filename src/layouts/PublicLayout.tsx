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
  const navType = useNavigationType(); // 'POP' | 'PUSH' | 'REPLACE'

  const { getItem: getInviteUrl } = useLocalStorage(LOCAL_STORAGE_KEY.inviteUrl);
  const { getItem: getInvitePassword } = useLocalStorage(LOCAL_STORAGE_KEY.invitePassword);

  // /onboarding 제외한 1~3단계만 보호
  const guardedPaths = onboardingSteps.slice(1);
  const needsCheck = guardedPaths.includes(location.pathname);

  // "직접 접근/뒤로가기" 같은 경우에만 가드 활성화
  const isManualOrHistoryNav = location.key === 'default' || navType === 'POP';

  // 필요한 값 읽기 (필요할 때만)
  const inviteUrl = needsCheck && isManualOrHistoryNav ? getInviteUrl() : null;
  const invitePassword = needsCheck && isManualOrHistoryNav ? getInvitePassword() : null;

  // 조건 불충족 시에만 리다이렉트 (직접 접근/뒤로가기일 때 한정)
  if (needsCheck && isManualOrHistoryNav && (!inviteUrl || !invitePassword)) {
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
