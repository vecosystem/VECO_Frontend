import { Navigate, Outlet, type RouteObject } from 'react-router-dom';
import ProtectedLayout from '../layouts/ProtectedLayout';
import GoalHome from '../pages/goal/GoalHome';
import IssueHome from '../pages/issue/IssueHome';
import NotiHome from '../pages/notification/NotiHome';
import Error404NotFound from '../pages/Error404NotFound';
import SettingTeam from '../pages/setting/SettingTeam.tsx';
import SettingMember from '../pages/setting/SettingMember.tsx';
import SettingMyProfile from '../pages/setting/SettingMyProfile.tsx';
import ExternalHome from '../pages/external/ExternalHome.tsx';
import WorkspaceIssue from '../pages/workspace/WorkspaceIssue.tsx';
import WorkspaceGoal from '../pages/workspace/WorkspaceGoal.tsx';
import WorkspaceExternal from '../pages/workspace/WorkspaceExternal.tsx';
import GoalDetail from '../pages/goal/GoalDetail.tsx';
import IssueDetail from '../pages/issue/IssueDetail.tsx';
import SettingWorkspaceProfile from '../pages/setting/SettingWorkspaceProfile.tsx';
import ExternalDetail from '../pages/external/ExternalDetail.tsx';
import WorkspaceGoalDetail from '../pages/workspace/WorkspaceGoalDetail.tsx';
import WorkspaceIssueDetail from '../pages/workspace/WorkspaceIssueDetail.tsx';
import WorkspaceExternalDetail from '../pages/workspace/WorkspaceExternalDetail.tsx';

export const protectedRoutes: RouteObject[] = [
  {
    // 워크스페이스 내부 페이지들 : 로그인해야 들어올 수 있음
    path: '/workspace',
    element: <ProtectedLayout />,
    errorElement: <Error404NotFound />,

    children: [
      { index: true, element: <WorkspaceIssue /> },
      /* 알람 페이지 */
      {
        path: 'noti',
        element: <Outlet />,
        children: [{ index: true, element: <NotiHome /> }],
      },
      /* 설정 페이지들 */
      {
        path: 'setting',
        element: <Outlet />,
        children: [
          // 기본 경로는 워크스페이스 프로필 페이지로 리다이렉트.
          { index: true, element: <Navigate to="ws-profile" replace /> },
          { path: 'ws-profile', element: <SettingWorkspaceProfile /> },
          { path: 'team-list', element: <SettingTeam /> },
          { path: 'team-members', element: <SettingMember /> },
          { path: 'my-profile', element: <SettingMyProfile /> },
        ],
      },
      /* 워크스페이스 전체 팀 페이지들 */
      {
        path: 'default/team/:teamId',
        element: <Outlet />,
        children: [
          // 기본 경로는 이슈 페이지로 리다이렉트
          { index: true, element: <Navigate to="issue" replace /> },
          { path: 'issue', element: <WorkspaceIssue /> },
          { path: 'issue/:issueId', element: <WorkspaceIssueDetail /> },
          { path: 'goal', element: <WorkspaceGoal /> },
          { path: 'goal/:goalId', element: <WorkspaceGoalDetail /> },
          { path: 'ext', element: <WorkspaceExternal /> },
          { path: 'ext/:extId', element: <WorkspaceExternalDetail /> },
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
          { path: 'goal/:goalId', element: <GoalDetail /> },
          { path: 'issue', element: <IssueHome /> },
          { path: 'issue/:issueId', element: <IssueDetail /> },
          { path: 'ext', element: <ExternalHome /> },
          { path: 'ext/:extId', element: <ExternalDetail /> },
        ],
      },
    ],
  },
];
