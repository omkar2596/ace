import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  // You can specify default options here if needed
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Example: 5 minutes
      cacheTime: 1000 * 60 * 10, // Example: 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});
