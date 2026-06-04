import React from 'react';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export default function AppLayout({ children, activePage, onNavigate }: AppLayoutProps) {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      background: 'var(--background)'
    }}>
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <main style={{
        marginLeft: 280,
        flex: 1,
        padding: 32,
        height: '100vh',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--background)'
      }}>
        {children}
      </main>
    </div>
  );
}
