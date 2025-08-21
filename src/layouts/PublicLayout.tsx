import { Outlet } from 'react-router-dom';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ServerError from '../pages/ServerError.tsx';

const PublicLayout = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ServerError}>
          <Suspense fallback={<LoadingSpinner />}>
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
