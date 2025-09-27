  
'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface QueryProviderProps {
  children: React.ReactNode;
}

  const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
              staleTime: 5 * 60 * 1000,                 gcTime: 10 * 60 * 1000,                 retry: (failureCount, error: any) => {
                  if (error?.status >= 400 && error?.status < 500 && error?.status !== 408) {
          return false;
        }
                  return failureCount < 3;
      },
              retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
              refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
              retry: 1,
              retryDelay: 1000,
    },
  },
});

 
export const QueryProvider  = ({ children }:QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
};