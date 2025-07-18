import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './PublicRoutes';
import { protectedRoutes } from './ProtectedRoutes';
import Error404NotFound from '../pages/Error404NotFound';

const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
  // 모든 잘못된 경로는 Not Found로 처리
  { path: '*', element: <Error404NotFound /> },
]);

export default router;
