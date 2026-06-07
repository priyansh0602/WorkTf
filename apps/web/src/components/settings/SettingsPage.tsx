/**
 * SettingsPage — Settings page assembling profile, notifications, and security.
 *
 * Manages notification toggle state and renders a sign out button.
 */

import { useState, useCallback } from "react";

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
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', maxWidth: 720, margin: '0 auto', width: '100%' }}>
      {/* Page title */}
      <h1
        style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: "28px",
          fontWeight: 700,
          color: "var(--on-surface)",
          marginTop: 0,
          flexShrink: 0,
          marginBottom: 16
        }}
      >
        Settings
      </h1>

      {/* ── Scrollable Settings Content ─────────────── */}
      <div
        style={{
          flex: 1,
          paddingRight: 4,
          paddingBottom: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12
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
      </div>
    </div>
  );
}
