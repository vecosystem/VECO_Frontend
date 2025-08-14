import type { RouteObject } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import OnboardingSSOLogin from '../pages/onboarding/OnboardingSSOLogin';
import OnboardingCreateWorkspace from '../pages/onboarding/OnboardingCreateWorkspace';
import OnboardingInviteMember from '../pages/onboarding/OnboardingInviteMember';
import OnboardingFinish from '../pages/onboarding/OnboardingFinish';
import OnboardingError404NotFound from '../pages/onboarding/OnboardingError404NotFound.tsx';
import ParticipateWorkspaceInputPw from '../pages/onboarding/ParticipateWorkspaceInputPw';
import { HomePage } from '../pages/home/HomePage.tsx';
import TokenLoading from '../pages/onboarding/TokenLoading.tsx';
import InviteLoading from '../pages/onboarding/InviteLoading.tsx';
import WorkspaceComplete from '../pages/workspace/WorkspaceComplete.tsx';
import OnboardingGuard from '../components/Onboarding/OnboardingGuard.tsx';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <OnboardingError404NotFound />,
    children: [
      // 도메인 최상위: 백호 랜딩페이지
      { index: true, element: <HomePage /> },
    ],
  },
  /* 초대 받은 사용자를 위한 리다이렉트 페이지 */
  {
    path: '/:workspaceName/invite',
    element: <InviteLoading />,
  },
  /* 온보딩 완료한 사용자를 위한 리다이렉트 페이지 */
  {
    path: '/workspace/complete',
    element: <WorkspaceComplete />,
  },
  /* Onboarding 단계 페이지들 */
  {
    path: '/onboarding',
    element: <PublicLayout />,
    errorElement: <OnboardingError404NotFound />,
    children: [
      {
        index: true,
        element: <OnboardingSSOLogin />,
      },
      {
        path: 'workspace',
        element: (
          <OnboardingGuard>
            <OnboardingCreateWorkspace />
          </OnboardingGuard>
        ),
      },
      {
        path: 'invite',
        element: (
          <OnboardingGuard>
            <OnboardingInviteMember />
          </OnboardingGuard>
        ),
      },
      {
        path: 'fin',
        element: (
          <OnboardingGuard>
            <OnboardingFinish />
          </OnboardingGuard>
        ),
      },
      {
        path: 'input-pw',
        element: (
          <OnboardingGuard>
            <ParticipateWorkspaceInputPw />,
          </OnboardingGuard>
        ),
      },
      /* accessToken 저장 및 워크스페이스 조회하는 리다이렉트 페이지 */
      {
        path: 'loading',
        element: <TokenLoading />,
      },
    ],
  },
];
