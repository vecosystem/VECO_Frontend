import { Navigate, useLocation } from 'react-router-dom';
import onboardingSteps from '../../constants/onboardingSteps';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { validateInviteUrl } from '../../utils/validateInviteUrl';

type Props = { children: React.ReactNode };

const ONBOARDING_STATUS_KEY = 'onboarding-status';

export default function OnboardingGuard({ children }: Props) {
  const location = useLocation();
  const guardedPaths = onboardingSteps.slice(1); // '/onboarding' 제외
  const needsCheck = guardedPaths.includes(location.pathname);

  const navEntry = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined;
  const isReload = navEntry?.type === 'reload';
  const isManualNav = location.key === 'default' && !isReload;

  const { getItem: getInviteUrl } = useLocalStorage(LOCAL_STORAGE_KEY.inviteUrl);
  const { getItem: getInvitePassword } = useLocalStorage(LOCAL_STORAGE_KEY.invitePassword);
  const { getItem: getIsInvite } = useLocalStorage(LOCAL_STORAGE_KEY.isInvite);

  const inviteUrl = needsCheck && isManualNav ? getInviteUrl() : null;
  const invitePassword = needsCheck && isManualNav ? getInvitePassword() : null;
  const isInvite = getIsInvite();
  const hasOnboardingStatus =
    needsCheck && isManualNav && localStorage.getItem(ONBOARDING_STATUS_KEY) !== null;
  const isValid = validateInviteUrl(inviteUrl);

  // 현재 경로가 가드 대상 or 주소창 직접 입력/외부 진입
  // 낯선 사용자 / 초기 사용자 / 기존 사용자 / 초대받은 사용자 모두의 강제 접근을 차단시킴
  if (
    needsCheck &&
    isManualNav &&
    (!isValid || !invitePassword || isInvite || hasOnboardingStatus)
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}
