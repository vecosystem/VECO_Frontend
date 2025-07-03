import type { RouteObject } from 'react-router-dom';
import AuthRedirect from '../components/AuthRedirect';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AuthRedirect />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: '/onboarding',
    element: <div>OnboardingLayout</div>, // Placeholder (필요시 OnboardingLayout 작성 후 연결)
    errorElement: <div>Not Found</div>,

    /*
      하위 경로 페이지들: 전부 placeholder 처리해둠.
      필요시 각 페이지 파일 작성 후 연결하여 사용.
    */
    children: [
      { index: true, element: <div>{/* Onboarding_SSO_Login 페이지 */}</div> },
      { path: 'workspace', element: <div>{/* Onboarding_Create_Workspace 페이지 */}</div> },
      { path: 'integration', element: <div>{/* Onboarding_External_Integration 페이지 */}</div> },
      { path: 'invite', element: <div>{/* Onboarding_Invite_Members 페이지 */}</div> },
      { path: 'fin', element: <div>{/* Onboarding_Finish 페이지 */}</div> },
    ],
  },
];
