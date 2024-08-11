'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const queryRootClient = new QueryClient();

export const ReactQueryProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryRootClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
