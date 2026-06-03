/**
 * User — Type definitions for platform user accounts.
 *
 * Users authenticate via Clerk. Each user is on a plan that
 * determines their call limits and feature access.
 */

// ─── Enums ──────────────────────────────────────────────────────────

/** Subscription tier determining call limits and feature access. */
export enum PlanType {
  FREE = "FREE",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

// ─── Interfaces ─────────────────────────────────────────────────────

/** User profile stored in the database, linked to Clerk by clerkId. */
export interface IUser {
  id: string;
  /** Clerk-issued unique identifier for authentication. */
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  plan: PlanType;
  /** Number of calls made in the current billing period. */
  callsUsed: number;
  /** Maximum calls allowed by the user's current plan. */
  callsLimit: number;
  /** One agent per user for MVP — will support multiple later. */
  agentId?: string;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
