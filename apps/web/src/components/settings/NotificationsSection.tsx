/**
 * NotificationsSection — Notification preference toggles.
 *
 * Three toggle rows for email, SMS, and desktop notification settings.
 */

import { Card, Toggle } from "@components/ui";

interface NotificationsSectionProps {
  emailAlerts: boolean;
  smsAlerts: boolean;
  desktopNotifications: boolean;
  onChange: (key: string, value: boolean) => void;
}

const NOTIFICATION_OPTIONS = [
  {
    key: "emailAlerts",
    label: "Email Alerts",
    desc: "Receive call summaries and alerts via email",
  },
  {
    key: "smsAlerts",
    label: "SMS Alerts",
    desc: "Get instant SMS notifications on missed calls",
  },
  {
    key: "desktopNotifications",
    label: "Desktop Notifications",
    desc: "Browser push notifications for live events",
  },
] as const;

export default function NotificationsSection({
  emailAlerts,
  smsAlerts,
  desktopNotifications,
  onChange,
}: NotificationsSectionProps) {
  const values: Record<string, boolean> = {
    emailAlerts,
    smsAlerts,
    desktopNotifications,
  };

  return (
    <Card padding={20}>
      {/* Section title */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "15px",
          fontWeight: 600,
          color: "var(--on-surface)",
          marginBottom: "16px",
        }}
      >
        Notifications
      </div>

      {/* Toggle rows */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {NOTIFICATION_OPTIONS.map((opt) => (
          <div
            key={opt.key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--on-surface)",
                  marginBottom: "2px",
                }}
              >
                {opt.label}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--on-surface-variant)",
                }}
              >
                {opt.desc}
              </div>
            </div>
            <Toggle
              on={values[opt.key]}
              onChange={(val) => onChange(opt.key, val)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
