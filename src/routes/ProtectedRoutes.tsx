import { Navigate, Outlet, type RouteObject } from 'react-router-dom';
import ProtectedLayout from '../layouts/ProtectedLayout';
import GoalHome from '../pages/goal/GoalHome';
import IssueHome from '../pages/issue/IssueHome';
import NotiHome from '../pages/notification/NotiHome';
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
import ServerError from '../pages/ServerError.tsx';
import GithubComplete from '../pages/external/GithubComplete.tsx';
import SlackComplete from '../pages/external/SlackComplete.tsx';

export const protectedRoutes: RouteObject[] = [
  {
    // 워크스페이스 내부 페이지들 : 로그인해야 들어올 수 있음
    path: '/workspace',
    element: <ProtectedLayout />,
    errorElement: (
      <ServerError
        error={
          {
            isAxiosError: true,
            response: { status: 500 },
          } as any
        }
        resetErrorBoundary={() => window.location.reload()}
      />
    ),

    children: [
      { index: true, element: <Navigate to="default/team/:teamId/issue" replace /> },
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

          // 워크스페이스 이슈 관련 라우트
          { path: 'issue', element: <WorkspaceIssue /> },
          { path: 'issue/detail/create', element: <WorkspaceIssueDetail initialMode="create" /> },
          { path: 'issue/:issueId', element: <WorkspaceIssueDetail initialMode="view" /> },
          { path: 'issue/:issueId/edit', element: <WorkspaceIssueDetail initialMode="edit" /> },

          // 워크스페이스 목표 관련 라우트
          { path: 'goal', element: <WorkspaceGoal /> },
          { path: 'goal/detail/create', element: <WorkspaceGoalDetail initialMode="create" /> },
          { path: 'goal/:goalId', element: <WorkspaceGoalDetail initialMode="view" /> },
          { path: 'goal/:goalId/edit', element: <WorkspaceGoalDetail initialMode="edit" /> },

          // 워크스페이스 외부 관련 라우트
          { path: 'ext', element: <WorkspaceExternal /> },
          { path: 'ext/detail/create', element: <WorkspaceExternalDetail initialMode="create" /> },
          { path: 'ext/:extId', element: <WorkspaceExternalDetail initialMode="view" /> },
          { path: 'ext/:extId/edit', element: <WorkspaceExternalDetail initialMode="edit" /> },
        ],
      },
      /* 팀별 페이지들 */
      {
        path: 'team/:teamId',
        element: <Outlet />,
        children: [
          // 기본 경로는 이슈 페이지로 리다이렉트.
          { index: true, element: <Navigate to="issue" replace /> },

          // 목표 관련 라우트
          { path: 'goal', element: <GoalHome /> },
          { path: 'goal/detail/create', element: <GoalDetail /> },
          { path: 'goal/:goalId', element: <GoalDetail /> },
          { path: 'goal/:goalId/edit', element: <GoalDetail /> },

          // 이슈 관련 라우트
          { path: 'issue', element: <IssueHome /> },
          { path: 'issue/detail/create', element: <IssueDetail initialMode="create" /> },
          { path: 'issue/:issueId', element: <IssueDetail initialMode="view" /> },
          { path: 'issue/:issueId/edit', element: <IssueDetail initialMode="edit" /> },

          // 외부 연동 관련 라우트
          { path: 'ext', element: <ExternalHome /> },
          { path: 'ext/detail/create', element: <ExternalDetail initialMode="create" /> },
          { path: 'ext/:extId', element: <ExternalDetail initialMode="view" /> },
          { path: 'ext/:extId/edit', element: <ExternalDetail initialMode="edit" /> },
        ],
      },
    ],
  },
  /* 연동 완료 페이지 */
  {
    path: 'github/complete',
    element: <GithubComplete />,
  },
  {
    path: 'slack/complete',
    element: <SlackComplete />,
  },
];
