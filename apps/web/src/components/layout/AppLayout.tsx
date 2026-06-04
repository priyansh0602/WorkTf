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
      minHeight: '100vh',
      background: 'var(--background)'
    }}>
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <main style={{
        marginLeft: '280px',
        flex: 1,
        padding: '32px',
        height: '100vh',
        background: 'var(--background)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </main>
    </div>
  );
}
