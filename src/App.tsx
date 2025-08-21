import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './utils/queryClient.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastProvider } from './components/Toast/ToastProvider.tsx';
import ToastViewport from './components/Toast/ToastViewport.tsx';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
        <ToastViewport />
      </ToastProvider>

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
