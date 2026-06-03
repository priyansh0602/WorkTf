/**
 * ProfileCard — Shows user profile info and current plan usage.
 *
 * Displays avatar, name, email, plan name with call usage,
 * and edit/upgrade actions.
 */

import { Card, Avatar, Button } from "@components/ui";

interface ProfileCardProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  plan?: string;
  callsUsed?: number;
  callsLimit?: number;
  onEdit?: () => void;
  onUpgrade?: () => void;
}

export default function ProfileCard({
  firstName = "John",
  lastName = "Doe",
  email = "john@company.com",
  plan = "Pro Plan",
  callsUsed = 284,
  callsLimit = 500,
  onEdit,
  onUpgrade,
}: ProfileCardProps) {
  return (
    <Card padding={20}>
      {/* ── Top row: avatar + info + edit ───────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Avatar firstName={firstName} lastName={lastName} size="lg" />
          <div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--on-surface)",
              }}
            >
              {firstName} {lastName}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--on-surface-variant)",
              }}
            >
              {email}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          style={{
            background: "none",
            border: "none",
            color: "var(--primary)",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            padding: 0,
          }}
        >
          Edit
        </button>
      </div>

      {/* ── Plan info row ──────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px",
          background: "var(--surface-low)",
          borderRadius: "10px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--on-surface)",
            }}
          >
            {plan}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--on-surface-variant)",
            }}
          >
            {callsUsed} / {callsLimit} calls this month
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onUpgrade}>
          Upgrade
        </Button>
      </div>
    </Card>
  );
}
