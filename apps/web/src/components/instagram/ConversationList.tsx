/**
 * ConversationList — Left panel showing all Instagram DM conversations.
 *
 * Same structure as WhatsApp ConversationList but themed for Instagram.
 */

import { useState, useMemo, useCallback } from "react";
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

const FILTERS = ["All", "Active", "Follow-up"];

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
    if (activeFilter === "Active") {
      result = result.filter((c) => c.status === "ACTIVE");
    } else if (activeFilter === "Follow-up") {
      result = result.filter((c) => c.isFollowUp);
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
        width: "320px",
        flexShrink: 0,
        borderRight: "1px solid var(--outline-variant)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header */}
      <div style={{ padding: "16px" }}>
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
            Conversations
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
      <div style={{ padding: "0 16px 12px" }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Filter tabs */}
      <div style={{ padding: "0 16px 12px", display: "flex", gap: "8px" }}>
        {FILTERS.map((f) => (
          <FilterPill
            key={f}
            label={f}
            isActive={activeFilter === f}
            onClick={() => setActiveFilter(f)}
          />
        ))}
      </div>

      {/* Conversation list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
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
            <Icon
              name="photo_camera"
              size={48}
              color="var(--outline-variant)"
            />
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

/** Small filter pill button. */
function FilterPill({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const handleEnter = useCallback(() => setHovered(true), []);
  const handleLeave = useCallback(() => setHovered(false), []);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        padding: "4px 12px",
        borderRadius: "999px",
        border: "none",
        fontSize: "12px",
        fontFamily: "'Geist', sans-serif",
        fontWeight: 500,
        cursor: "pointer",
        whiteSpace: "nowrap",
        background: isActive
          ? "var(--primary)"
          : hovered
            ? "var(--surface-high)"
            : "var(--surface-container)",
        color: isActive ? "var(--on-primary)" : "var(--on-surface-variant)",
        transition: "background 0.15s",
      }}
    >
      {label}
    </button>
  );
}
