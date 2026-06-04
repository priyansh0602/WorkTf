/**
 * SettingsPage — Settings page assembling profile, notifications, and security.
 *
 * Manages notification toggle state and renders a sign out button.
 */

import { useState, useCallback } from "react";
import { Icon } from "@components/ui";
import ProfileCard from "./ProfileCard";
import NotificationsSection from "./NotificationsSection";
import SecuritySection from "./SecuritySection";

interface Notifications {
  emailAlerts: boolean;
  smsAlerts: boolean;
  desktopNotifications: boolean;
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState<Notifications>({
    emailAlerts: true,
    smsAlerts: false,
    desktopNotifications: true,
  });

  const handleNotificationChange = useCallback((key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="animate-fade-in" style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", maxWidth: 720 }}>
      {/* Page title */}
      <h1
        style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: "28px",
          fontWeight: 700,
          color: "var(--on-surface)",
          marginBottom: "28px",
          marginTop: 0,
          flexShrink: 0,
        }}
      >
        Settings
      </h1>

      {/* ── Scrollable Settings Content ─────────────── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingRight: "4px",
          paddingBottom: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <ProfileCard />
        <NotificationsSection
          emailAlerts={notifications.emailAlerts}
          smsAlerts={notifications.smsAlerts}
          desktopNotifications={notifications.desktopNotifications}
          onChange={handleNotificationChange}
        />
        <SecuritySection />

        {/* ── Sign out button ────────────────────────── */}
        <button
          type="button"
          onClick={() => console.log("Sign out")}
          style={{
            background: "var(--error-container)",
            color: "var(--on-error-container)",
            border: "1px solid rgba(186, 26, 26, 0.2)",
            borderRadius: "10px",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "'Inter', sans-serif",
            width: "fit-content",
            marginTop: "4px",
          }}
        >
          <Icon name="logout" size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
