/**
 * Formatters — Pure display-formatting utilities used across the app.
 *
 * These functions are side-effect free and always return a string
 * suitable for direct rendering in the UI.
 */

/**
 * Converts a duration in seconds to a human-readable string.
 *
 * @example formatDuration(272)  → "4m 32s"
 * @example formatDuration(32)   → "0m 32s"
 * @example formatDuration(0)    → "—"
 */
export function formatDuration(seconds: number | undefined): string {
  if (seconds === undefined || seconds === null || seconds <= 0) {
    return "—";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}m ${secs.toString().padStart(2, "0")}s`;
}

/**
 * Formats a raw phone number string into (555) 123-4567 format.
 * If the input is already formatted or can't be parsed, returns as-is.
 *
 * @example formatPhoneNumber("5551234567")    → "(555) 123-4567"
 * @example formatPhoneNumber("+15551234567")  → "(555) 123-4567"
 * @example formatPhoneNumber("(555) 123-4567") → "(555) 123-4567"
 */
export function formatPhoneNumber(number: string): string {
  // Strip everything except digits
  const digits = number.replace(/\D/g, "");

  // Handle 10-digit US number
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  // Handle 11-digit US number with country code (1)
  if (digits.length === 11 && digits.startsWith("1")) {
    const local = digits.slice(1);
    return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
  }

  // Can't parse — return as-is
  return number;
}

/**
 * Returns a human-readable relative time string.
 *
 * @example formatTimeAgo(new Date())                          → "just now"
 * @example formatTimeAgo(new Date(Date.now() - 120_000))      → "2 min ago"
 * @example formatTimeAgo(new Date(Date.now() - 7_200_000))    → "2 hr ago"
 * @example formatTimeAgo(new Date(Date.now() - 86_400_000))   → "Yesterday"
 */
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return "just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  if (diffHours < 24) {
    return `${diffHours} hr ago`;
  }

  if (diffDays === 1) {
    return "Yesterday";
  }

  // Beyond yesterday — show a short date string
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

/**
 * Capitalizes and formats a call outcome enum value for display.
 *
 * @example formatCallOutcome("CONVERTED") → "Converted"
 * @example formatCallOutcome("VOICEMAIL") → "Voicemail"
 */
export function formatCallOutcome(outcome: string): string {
  if (!outcome) return "—";

  return outcome
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Returns the uppercase initials from a first and last name.
 *
 * @example getInitials("John", "Doe") → "JD"
 * @example getInitials("jane", "")    → "J"
 */
export function getInitials(firstName: string, lastName: string): string {
  const first = firstName.trim().charAt(0).toUpperCase();
  const last = lastName.trim().charAt(0).toUpperCase();

  return `${first}${last}`.trim();
}
