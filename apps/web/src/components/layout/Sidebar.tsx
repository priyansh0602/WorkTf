import { Button, Avatar } from '../ui';
import Icon from '../ui/Icon';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onNewCampaign?: () => void;
}

const navItems = [
  { id: "dashboard", icon: "dashboard", label: "Dashboard" },
  { id: "active-call", icon: "phone_in_talk", label: "Active Call" },
  { id: "call-logs", icon: "history", label: "Call Logs" },
  { id: "agent-config", icon: "tune", label: "Agent Config" },
  { id: "settings", icon: "settings", label: "Settings" }
];

export default function Sidebar({ activePage, onNavigate, onNewCampaign }: SidebarProps) {
  return (
    <div style={{
      width: '280px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      background: 'var(--surface)',
      borderRight: '1px solid var(--outline-variant)',
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      zIndex: 40,
      overflowY: 'auto'
    }}>
      {/* 1. LOGO AREA */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '32px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon name="phone_in_talk" style={{ color: 'var(--on-primary)', fontSize: '20px' }} />
        </div>
        <div style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--primary)'
        }}>
          WorkTF AI
        </div>
      </div>

      {/* 2. NEW CAMPAIGN BUTTON */}
      <div style={{ marginBottom: '24px' }}>
        <Button 
          variant="primary" 
          icon="add_call" 
          onClick={onNewCampaign}
          style={{ width: '100%' }}
        >
          New Campaign
        </Button>
      </div>

      {/* 3. NAVIGATION LINKS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {navItems.map(item => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                background: isActive ? 'var(--secondary-container)' : 'transparent',
                color: isActive ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)',
                fontWeight: isActive ? 600 : 400,
                transition: 'background 0.15s'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'var(--surface-low)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              <Icon name={item.icon} fill={isActive} style={{ fontSize: '20px' }} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* 4. BOTTOM SECTION */}
      <div style={{
        height: '1px',
        background: 'var(--outline-variant)',
        margin: '16px 0'
      }} />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <Avatar size="md" firstName="John" lastName="Doe" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--on-surface)'
          }}>John Doe</span>
          <span style={{
            fontSize: '12px',
            color: 'var(--on-surface-variant)'
          }}>Pro Plan</span>
        </div>
      </div>
    </div>
  );
}
