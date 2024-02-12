import './globals.css';

import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import type React from 'react';

import { Toaster } from '@/components/ui/toaster';
import ModalProvider from '@/providers/model.provider';

import { ThemeProvider } from '../providers/theme.provider';

const font = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Plura',
  description: 'All in one Agency Solution',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>
            {children}
            <Toaster />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
