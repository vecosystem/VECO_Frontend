import { Navigate, Outlet, type RouteObject } from 'react-router-dom';
import ProtectedLayout from '../layouts/ProtectedLayout';
import GoalHome from '../pages/goal/GoalHome';
import GoalDetail from '../pages/goal/GoalDetail';

export const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout />, // ProtectedLayout을 위한 placeholder (추후 ProtectedLayout 컴포넌트 작성 후 연결.)
    errorElement: <div>Not Found</div>,

    /*
      하위 경로 페이지들: 전부 placeholder 처리해둠.
      필요시 각 페이지 파일 작성 후 연결하여 사용.
    */
    children: [
      {
        path: 'my',
        element: <Outlet />, // Placeholder (필요시 컴포넌트로 변경하여 작성 후 연결)
        children: [
          // 기본 경로는 나의 이슈 페이지로 리다이렉트되게 했음. (문제시 변경)
          { index: true, element: <Navigate to="myissue" replace /> },
          { path: 'noti', element: <div>{/* Notification 페이지 */}</div> },
          { path: 'myissue', element: <div>{/* MyIssue_Home 페이지 */}</div> },
          { path: 'myissue/:myIssueId', element: <div>{/* MyIssue_Detail 페이지 */}</div> },
          { path: 'mygoal', element: <div>{/* MyGoal_Home 페이지 */}</div> },
          { path: 'mygoal/:mygGoalId', element: <div>{/* MyGoal_Detail 페이지 */}</div> },
          { path: 'setting', element: <div>{/* Setting 페이지 */}</div> },
        ],
      },
      {
        path: 'team/:teamId',
        element: <Outlet />, // Placeholder (필요시 컴포넌트로 변경하여 작성 후 연결)
        children: [
          // 기본 경로는 이슈 페이지로 리다이렉트.
          { index: true, element: <Navigate to="issue" replace /> },
          { path: 'goal', element: <GoalHome /> },
          { path: 'goal/:goalId', element: <GoalDetail /> },
          { path: 'issue', element: <div>{/* Issue_Home 페이지 */}</div> },
          { path: 'issue/:issueId', element: <div>{/* Issue_Detail 페이지 */}</div> },
          { path: 'ext', element: <div>{/* External_Home 페이지 */}</div> },
          { path: 'ext/:extId', element: <div>{/* External_Detail 페이지 */}</div> },
          { path: 'doc', element: <div>{/* Document_Home 페이지 */}</div> },
          { path: 'doc/:docId', element: <div>{/* Document_Detail 페이지 */}</div> },
        ],
      },
    ],
  },
];
