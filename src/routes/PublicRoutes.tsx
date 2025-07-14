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
    element: <AuthRedirect />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: '/onboarding',
    element: <PublicLayout />, // Placeholder (필요시 OnboardingLayout 작성 후 연결)
    errorElement: <div>Not Found</div>,

    /*
      하위 경로 페이지들: 전부 placeholder 처리해둠.
      필요시 각 페이지 파일 작성 후 연결하여 사용.
    */
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
    ],
  },
];
