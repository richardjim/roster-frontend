'use client';

import { ApolloProvider as Provider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import { ReactNode } from 'react';

interface ApolloProviderProps {
  children: ReactNode;
}

// Named export for consistency
export function ApolloProvider({ children }: ApolloProviderProps) {
  return <Provider client={apolloClient}>{children}</Provider>;
}
