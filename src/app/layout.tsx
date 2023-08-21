import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { useContext } from 'react';
import { GlobalStateContext } from '../store/GlobalState';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'B mart',
  description: 'B mart home',
};

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalStateContext>{children}</GlobalStateContext>
      </body>
    </html>
  );
}
