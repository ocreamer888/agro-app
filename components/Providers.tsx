'use client';

import { LoadingProvider } from '@/contexts/LoadingContext';
import Loading from './Loading';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <Loading />
      {children}
    </LoadingProvider>
  );
}

