import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './PublicRoutes';
import { protectedRoutes } from './ProtectedRoutes';
import ServerError from '../pages/ServerError';

const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
  // 모든 잘못된 경로는 ServerError 컴포넌트로 처리
  {
    path: '*',
    element: (
      <ServerError
        error={
          {
            isAxiosError: true,
            response: { status: 404 },
          } as any
        } // 최소 타입 충돌 방지를 위한 캐스팅
        resetErrorBoundary={() => window.location.reload()}
      />
    ),
  },
]);

export default router;
