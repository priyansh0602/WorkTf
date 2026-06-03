import { Button } from '../ui';
import Icon from '../ui/Icon';

interface TopNavProps {
  onGetStarted: () => void;
  onLogin?: () => void;
}

export default function TopNav({ onGetStarted, onLogin }: TopNavProps) {
  return (
    <div style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--outline-variant)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: '64px'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 32px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* 1. LEFT */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
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

        {/* 2. CENTER & RIGHT */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          {/* CENTER LINKS */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}>
            {['Features', 'Pricing', 'About'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  color: 'var(--on-surface-variant)',
                  fontSize: '16px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}
              >
                {link}
              </a>
            ))}
          </div>

          {/* VERTICAL DIVIDER */}
          <div style={{
            width: '1px',
            height: '24px',
            background: 'var(--outline-variant)'
          }} />

          {/* RIGHT ACTIONS */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <button
              onClick={onLogin}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--on-surface-variant)',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Log In
            </button>
            <Button variant="primary" size="md" onClick={onGetStarted}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
