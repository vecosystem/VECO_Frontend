// src/routers/index.ts
import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './PublicRoutes';
import { protectedRoutes } from './ProtectedRoutes';

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export default router;
