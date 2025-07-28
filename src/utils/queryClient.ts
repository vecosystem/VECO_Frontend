import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      throwOnError: true,
      refetchOnWindowFocus: true,
    },
  },
});

export default queryClient;
