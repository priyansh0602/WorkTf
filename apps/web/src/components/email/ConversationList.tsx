/**
 * ConversationList — Left panel showing all Email conversations.
 *
 * Shows an inbox-style list with "All", "Sent", "Follow-up", "Replied" filters.
 */

import { useState, useMemo } from "react";
import type { IConversation } from "@worktf/shared";
import { Icon } from "@components/ui";
import { SearchBar } from "@components/call-logs";
import { ContactCard } from "@components/messaging";

interface ConversationListProps {
  conversations: IConversation[];
  activeId?: string;
  onSelect: (conversation: IConversation) => void;
  onNewOutreach?: () => void;
}

const FILTERS = ["All", "Sent", "Follow-up", "Replied"];

export default function ConversationList({
  conversations,
  activeId,
  onSelect,
  onNewOutreach,
}: ConversationListProps) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    let result = conversations;
    if (activeFilter === "Sent") {
      result = result.filter((c) => c.status === "ACTIVE" || c.status === "WAITING");
    } else if (activeFilter === "Follow-up") {
      result = result.filter((c) => c.isFollowUp);
    } else if (activeFilter === "Replied") {
      result = result.filter((c) => c.followUpStatus === "RESPONDED");
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.contactName.toLowerCase().includes(q) ||
          c.contactHandle.toLowerCase().includes(q),
      );
    }
    return result;
  }, [conversations, search, activeFilter]);

  return (
    <div
      style={{
        width: 320,
        flexShrink: 0,
        borderRight: '1px solid var(--outline-variant)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div style={{ flexShrink: 0, padding: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--on-surface)",
            }}
          >
            Inbox
          </span>
          <button
            type="button"
            onClick={onNewOutreach}
            style={{
              background: "var(--primary)",
              color: "var(--on-primary)",
              border: "none",
              borderRadius: "8px",
              padding: "4px",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <Icon name="add" size={20} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ flexShrink: 0, padding: '0 16px 12px' }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", borderBottom: "1px solid var(--outline-variant)", padding: "0 16px" }}>
        {FILTERS.map((f) => (
          <FilterTab
            key={f}
            label={f}
            isActive={activeFilter === f}
            onClick={() => setActiveFilter(f)}
          />
        ))}
      </div>

      {/* Conversation list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
        {filtered.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "48px 16px",
              textAlign: "center",
            }}
          >
            <Icon name="mail" size={48} color="var(--outline-variant)" />
            <div
              style={{
                fontSize: "14px",
                color: "var(--on-surface-variant)",
                marginTop: "12px",
              }}
            >
              No conversations yet
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--outline)",
                marginTop: "4px",
              }}
            >
              Start a new outreach campaign
            </div>
          </div>
        ) : (
          filtered.map((conv) => (
            <ContactCard
              key={conv.id}
              conversation={conv}
              isActive={conv.id === activeId}
              onClick={onSelect}
            />
          ))
        )}
      </div>
    </div>
  );
}

/** Traditional tab button. */
function FilterTab({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px 16px",
        border: "none",
        borderBottom: isActive ? "2px solid var(--primary)" : "2px solid transparent",
        background: "transparent",
        fontSize: "14px",
        fontFamily: "'Geist', sans-serif",
        fontWeight: isActive ? 600 : 500,
        cursor: "pointer",
        color: isActive ? "var(--primary)" : "var(--on-surface-variant)",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}
