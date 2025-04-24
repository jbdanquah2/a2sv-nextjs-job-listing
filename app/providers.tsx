'use client';

import { SessionProvider } from 'next-auth/react';
import ReduxProvider from '../lib/ReduxProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </SessionProvider>
  );
} 