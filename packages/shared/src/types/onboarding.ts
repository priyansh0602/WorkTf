/**
 * Onboarding — Type definitions for the post-signup onboarding wizard.
 *
 * The wizard collects four preferences that seed the user's
 * initial agent configuration.
 */

import type { AgentTone, AgentUseCase, AudienceType, CallVolume } from "./agent";

// ─── Interfaces ─────────────────────────────────────────────────────

/** Aggregated answers collected across all onboarding steps. */
export interface IOnboardingAnswers {
  useCase: AgentUseCase;
  callVolume: CallVolume;
  agentTone: AgentTone;
  audienceType: AudienceType;
  /** Selected channel combination from the 5th onboarding step. */
  channels?: string;
}

/** Configuration for a single step in the onboarding wizard. */
export interface IOnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  options: IOnboardingOption[];
}

/** A selectable option card within an onboarding step. */
export interface IOnboardingOption {
  /** Enum value stored when this option is selected. */
  value: string;
  /** Icon name (from lucide-react) to render on the card. */
  icon: string;
  label: string;
  desc: string;
}
