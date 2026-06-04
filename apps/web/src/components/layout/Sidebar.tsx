/**
 * Sidebar — Main navigation sidebar with section-grouped nav items.
 *
 * Sections: Dashboard/Active Call, MESSAGING (WhatsApp/Instagram/Email),
 * ACTIVITY (Call Logs/Agent Config/Settings).
 */

import { Button, Avatar } from "../ui";
import Icon from "../ui/Icon";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onNewCampaign?: () => void;
}

/** Navigation item definition. */
interface NavItem {
  type: "nav";
  id: string;
  icon: string;
  label: string;
}

/** Section divider label. */
interface SectionDivider {
  type: "divider";
  label: string;
}

type SidebarEntry = NavItem | SectionDivider;

const SIDEBAR_ENTRIES: SidebarEntry[] = [
  { type: "nav", id: "dashboard", icon: "dashboard", label: "Dashboard" },
  { type: "nav", id: "active-call", icon: "phone_in_talk", label: "Active Call" },
  { type: "divider", label: "MESSAGING" },
  { type: "nav", id: "whatsapp", icon: "chat", label: "WhatsApp" },
  { type: "nav", id: "instagram", icon: "photo_camera", label: "Instagram" },
  { type: "nav", id: "email", icon: "mail", label: "Email" },
  { type: "divider", label: "ACTIVITY" },
  { type: "nav", id: "call-logs", icon: "history", label: "Call Logs" },
  { type: "nav", id: "agent-config", icon: "tune", label: "Agent Config" },
  { type: "nav", id: "settings", icon: "settings", label: "Settings" },
];

export default function Sidebar({ activePage, onNavigate, onNewCampaign }: SidebarProps) {
  return (
    <div style={{
      width: "280px",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      background: "var(--surface)",
      borderRight: "1px solid var(--outline-variant)",
      display: "flex",
      flexDirection: "column",
      zIndex: 40,
      overflow: "hidden",
      boxSizing: "border-box",
    }}>
      {/* 1. LOGO AREA */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px 16px 0",
        marginBottom: "32px",
        flexShrink: 0,
      }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          background: "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Icon name="phone_in_talk" style={{ color: "var(--on-primary)", fontSize: "20px" }} />
        </div>
        <div style={{
          fontFamily: "Geist, sans-serif",
          fontSize: "20px",
          fontWeight: 700,
          color: "var(--primary)",
        }}>
          WorkTF AI
        </div>
      </div>

      {/* 2. NEW CAMPAIGN BUTTON */}
      <div style={{ padding: "0 16px 24px", flexShrink: 0 }}>
        <Button
          variant="primary"
          icon="add_call"
          onClick={onNewCampaign}
          style={{ width: "100%" }}
        >
          New Campaign
        </Button>
      </div>

      {/* 3. NAVIGATION LINKS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1, overflowY: "auto", minHeight: 0, padding: "0 16px" }}>
        {SIDEBAR_ENTRIES.map((entry, index) => {
          if (entry.type === "divider") {
            return (
              <div
                key={`divider-${index}`}
                style={{
                  padding: "8px 14px 4px",
                  fontSize: "10px",
                  fontFamily: "'Geist', sans-serif",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--outline)",
                }}
              >
                {entry.label}
              </div>
            );
          }

          const isActive = activePage === entry.id;
          return (
            <button
              key={entry.id}
              onClick={() => onNavigate(entry.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
                fontSize: "14px",
                fontFamily: "Geist, sans-serif",
                background: isActive ? "var(--primary-fixed)" : "transparent",
                color: isActive ? "var(--primary)" : "var(--on-surface-variant)",
                fontWeight: isActive ? 600 : 500,
                transition: "background 0.15s, color 0.15s",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "var(--surface-low)";
                  e.currentTarget.style.color = "var(--on-surface)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--on-surface-variant)";
                }
              }}
            >
              <Icon name={entry.icon} fill={isActive} style={{ fontSize: "20px" }} />
              {entry.label}
            </button>
          );
        })}
      </div>

      {/* 4. BOTTOM SECTION */}
      <div style={{
        height: "1px",
        background: "var(--outline-variant)",
        margin: "16px 16px",
        flexShrink: 0,
      }} />
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "0 16px 16px",
        flexShrink: 0,
      }}>
        <Avatar size="md" firstName="John" lastName="Doe" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--on-surface)",
          }}>John Doe</span>
          <span style={{
            fontSize: "12px",
            color: "var(--on-surface-variant)",
          }}>Pro Plan</span>
        </div>
      </div>
    </div>
  );
}
