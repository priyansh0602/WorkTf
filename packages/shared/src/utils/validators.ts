/**
 * Validators — Input validation utilities used in forms and API endpoints.
 *
 * Each function returns a boolean so it can be composed into
 * form validation logic or used in API request guards.
 */

/**
 * Validates a US phone number in common formats.
 *
 * Accepted formats:
 * - (555) 123-4567
 * - 555-123-4567
 * - +15551234567
 * - 5551234567
 *
 * @example isValidPhoneNumber("(555) 123-4567") → true
 * @example isValidPhoneNumber("123")             → false
 */
export function isValidPhoneNumber(number: string): boolean {
  // Strip all non-digit characters
  const digits = number.replace(/\D/g, "");

  // Must be exactly 10 digits, or 11 starting with country code 1
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

/**
 * Validates an email address format.
 *
 * Uses a pragmatic regex — not RFC 5322 exhaustive, but catches
 * the vast majority of real-world valid/invalid inputs.
 *
 * @example isValidEmail("user@example.com") → true
 * @example isValidEmail("not-an-email")     → false
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates that an agent goal description is between 20 and 1000 characters.
 *
 * @example isValidAgentGoal("Book appointments for dental clinic") → true
 * @example isValidAgentGoal("short")                               → false
 */
export function isValidAgentGoal(goal: string): boolean {
  const trimmed = goal.trim();
  return trimmed.length >= 20 && trimmed.length <= 1000;
}

/**
 * Validates that an agent name is between 2 and 50 characters
 * and contains only letters, numbers, spaces, and hyphens.
 *
 * @example isValidAgentName("Sales Agent")  → true
 * @example isValidAgentName("A")            → false
 * @example isValidAgentName("Agent@#!")     → false
 */
export function isValidAgentName(name: string): boolean {
  const trimmed = name.trim();

  if (trimmed.length < 2 || trimmed.length > 50) {
    return false;
  }

  // Allow letters (any script), digits, spaces, and hyphens
  const nameRegex = /^[\p{L}\p{N}\s-]+$/u;
  return nameRegex.test(trimmed);
}
