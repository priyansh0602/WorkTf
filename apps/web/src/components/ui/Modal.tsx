/**
 * Modal — Centered overlay dialog.
 *
 * Renders a fixed-position overlay with a centered modal box.
 * Supports title, close button, click-outside-to-close, scroll lock,
 * and a subtle scale+fade entrance animation.
 *
 * @example
 *   <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Confirm">
 *     <p>Are you sure?</p>
 *   </Modal>
 */

import React, { useEffect, useCallback, useRef } from "react";
import Icon from "./Icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** Modal box width in px (default 480) */
  width?: number;
  hideCloseButton?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  width = 480,
  hideCloseButton = false,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  /* Close on Escape key */
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  /* Close when clicking the overlay (outside the modal box) */
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose],
  );

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(11, 28, 48, 0.5)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Modal box */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title || "Dialog"}
        style={{
          background: "var(--surface-lowest)",
          borderRadius: "20px",
          padding: "24px",
          border: "1px solid var(--outline-variant)",
          boxShadow: "0 8px 32px rgba(15, 23, 42, 0.15)",
          width: "100%",
          maxWidth: width,
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "modal-in 0.2s ease-out forwards",
        }}
      >
        {/* Header: title + close button */}
        {(title || !hideCloseButton) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            {title && (
              <h2
                style={{
                  margin: 0,
                  fontFamily: "'Geist', sans-serif",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--on-surface)",
                }}
              >
                {title}
              </h2>
            )}

            {!hideCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px",
                  cursor: "pointer",
                  color: "var(--on-surface-variant)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.15s",
                  marginLeft: "auto",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget.style.background) = "var(--surface-container)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget.style.background) = "none";
                }}
              >
                <Icon name="close" size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
