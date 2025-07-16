import type { RouteObject } from 'react-router-dom';
import AuthRedirect from '../components/AuthRedirect';
import PublicLayout from '../layouts/PublicLayout';
import OnboardingSSOLogin from '../pages/onboarding/OnboardingSSOLogin';
import OnboardingCreateWorkspace from '../pages/onboarding/OnboardingCreateWorkspace';
import OnboardingInviteMember from '../pages/onboarding/OnboardingInviteMember';
import OnboardingFinish from '../pages/onboarding/OnboardingFinish';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <div>HomeLayout</div>,
    errorElement: <div>Not Found</div>,
    children: [
      // 도메인 최상위: 백호 랜딩페이지
      { index: true, element: <div>VECO Landing Page</div> },
      // '시작하기'를 눌렀을 때 AuthRedirect 컴포넌트로 리다이렉트.
      // 사용자 인증 여부에 따라 protected 또는 public 경로로 리다이렉트됨.
      { path: 'entry', element: <AuthRedirect /> },
    ],
  },
  /* Onboarding 단계 페이지들 */
  {
    path: '/onboarding',
    element: <PublicLayout />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        index: true,
        element: (
          <div>
            <OnboardingSSOLogin />
          </div>
        ),
      },
      {
        path: 'workspace',
        element: (
          <div>
            <OnboardingCreateWorkspace />
          </div>
        ),
      },
      {
        path: 'invite',
        element: (
          <div>
            <OnboardingInviteMember />
          </div>
        ),
      },
      {
        path: 'fin',
        element: (
          <div>
            <OnboardingFinish />
          </div>
        ),
      },
      {
        path: 'input-pw',
        element: <div>Participate_Workspace_Input_PW</div>,
      },
    ],
  },
];
