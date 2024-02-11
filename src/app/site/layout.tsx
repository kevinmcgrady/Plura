import type React from 'react';

import { Navigation } from '@/components/site/Navigation';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className='h-full'>
      <Navigation />
      {children}
    </main>
  );
};

export default Layout;
