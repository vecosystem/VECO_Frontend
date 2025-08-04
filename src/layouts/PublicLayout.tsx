import { Outlet } from 'react-router-dom';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import Server500Error from '../pages/Server500Error.tsx';
import { Suspense } from 'react';
import Loading from '../pages/Loading.tsx';

const PublicLayout = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={Server500Error}>
          <Suspense fallback={<Loading />}>
            <main className="w-full h-screen overflow-auto basic-scroll bg-gray-onboard">
              <div className="min-w-max min-h-screen flex flex-col items-center justify-center">
                <Outlet />
              </div>
            </main>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default PublicLayout;
