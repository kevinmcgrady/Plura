import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type React from 'react';

import { Navigation } from '@/components/site/Navigation';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className='h-full'>
        <Navigation />
        {children}
      </main>
    </ClerkProvider>
  );
};

export default Layout;
