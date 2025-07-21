import { Navigate, Outlet, type RouteObject } from 'react-router-dom';
import ProtectedLayout from '../layouts/ProtectedLayout';
import GoalHome from '../pages/goal/GoalHome';
import IssueHome from '../pages/issue/IssueHome';
import Error404NotFound from '../pages/Error404NotFound';
import SettingTeam from '../pages/setting/SettingTeam.tsx';
import SettingMember from '../pages/setting/SettingMember.tsx';
import SettingMyProfile from '../pages/setting/SettingMyProfile.tsx';

export const protectedRoutes: RouteObject[] = [
  {
    // 워크스페이스 내부 페이지들 : 로그인해야 들어올 수 있음
    path: '/workspace',
    element: <ProtectedLayout />,
    errorElement: <Error404NotFound />,

    children: [
      { index: true, element: <Navigate to="team/default/issue" replace /> }, // 기본 경로는 team/default로 리다이렉트
      /* 알람 페이지 */
      {
        path: 'noti',
        element: <Outlet />,
        children: [{ index: true, element: <div>Notification</div> }],
      },
      /* 설정 페이지들 */
      {
        path: 'setting',
        element: <Outlet />,
        children: [
          // 기본 경로는 워크스페이스 프로필 페이지로 리다이렉트.
          { index: true, element: <Navigate to="ws-profile" replace /> },
          { path: 'ws-profile', element: <div>Setting_Workspace_Profile</div> },
          { path: 'team-list', element: <SettingTeam /> },
          { path: 'team-members', element: <SettingMember /> },
          { path: 'my-profile', element: <SettingMyProfile /> },
        ],
      },
      /* 워크스페이스 전체 팀 페이지들 */
      {
        path: 'team/default',
        element: <Outlet />,
        children: [
          // 기본 경로는 이슈 페이지로 리다이렉트
          { index: true, element: <Navigate to="issue" replace /> },
          { path: 'issue', element: <div>Workspace_Issue_Home</div> },
          { path: 'issue/:issueId', element: <div>Workspace_Issue_Detail</div> },
          { path: 'goal', element: <div>Workspace_Goal_Home</div> },
          { path: 'goal/:goalId', element: <div>Workspace_Goal_Detail</div> },
          { path: 'ext', element: <div>Workspace_External_Home</div> },
          { path: 'ext/:extId', element: <div>Workspace_External_Detail</div> },
        ],
      },
      /* 팀별 페이지들 */
      {
        path: 'team/:teamId',
        element: <Outlet />,
        children: [
          // 기본 경로는 이슈 페이지로 리다이렉트.
          { index: true, element: <Navigate to="issue" replace /> },
          { path: 'goal', element: <GoalHome /> },
          { path: 'goal/:goalId', element: <div>Goal_Detail</div> },
          { path: 'issue', element: <IssueHome /> },
          { path: 'issue/:issueId', element: <div>Issue_Detail</div> },
          { path: 'ext', element: <div>External_Home</div> },
          { path: 'ext/:extId', element: <div>External_Detail</div> },
        ],
      },
    ],
  },
];
