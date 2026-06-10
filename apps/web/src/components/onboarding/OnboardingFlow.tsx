/**
 * OnboardingFlow — Multi-step onboarding wizard controller.
 *
 * Manages step navigation and answer collection across five
 * onboarding questions (use case, call volume, tone, audience, channels).
 * On completion, passes the collected answers to the parent via
 * the onComplete callback.
 */

import { useCallback, useEffect } from "react";
import type { IOnboardingAnswers, IOnboardingOption } from "@worktf/shared";
import { Button } from "@components/ui";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import { useOnboarding } from "../../hooks/useOnboarding";
import { useUserStore } from "../../store";

// ─── Question definitions ───────────────────────────────────────────

interface QuestionDef {
  id: string;
  title: string;
  subtitle: string;
  options: IOnboardingOption[];
}

const QUESTIONS: QuestionDef[] = [
  {
    id: "useCase",
    title: "What is your primary use case?",
    subtitle:
      "Select the option that best describes your immediate need to help us configure your AI.",
    options: [
      {
        value: "LEAD_QUALIFICATION",
        icon: "person_search",
        label: "Lead Qualification",
        desc: "Automatically vet inbound inquiries and capture essential prospect data.",
      },
      {
        value: "APPOINTMENT_BOOKING",
        icon: "event_available",
        label: "Appointment Booking",
        desc: "Schedule meetings seamlessly integrated with your team's calendar.",
      },
      {
        value: "CUSTOMER_SUPPORT",
        icon: "support_agent",
        label: "Customer Support",
        desc: "Handle tier-1 queries, troubleshoot common issues, and route complex cases.",
      },
      {
        value: "OUTBOUND_SALES",
        icon: "outgoing_mail",
        label: "Outbound Sales",
        desc: "Initiate proactive outreach campaigns and gauge initial prospect interest.",
      },
    ],
  },
  {
    id: "callVolume",
    title: "What's your expected call volume?",
    subtitle:
      "This helps us allocate the right resources for your agent.",
    options: [
      {
        value: "LOW",
        icon: "signal_cellular_1_bar",
        label: "Low (< 50/day)",
        desc: "Just getting started or testing the waters.",
      },
      {
        value: "MEDIUM",
        icon: "signal_cellular_2_bar",
        label: "Medium (50–200/day)",
        desc: "Growing team with consistent outreach needs.",
      },
      {
        value: "HIGH",
        icon: "signal_cellular_3_bar",
        label: "High (200–500/day)",
        desc: "Established sales or support operations.",
      },
      {
        value: "ENTERPRISE",
        icon: "signal_cellular_4_bar",
        label: "Enterprise (500+/day)",
        desc: "Large-scale deployment across multiple teams.",
      },
    ],
  },
  {
    id: "agentTone",
    title: "What tone should your AI agent use?",
    subtitle:
      "Choose the voice personality that best represents your brand.",
    options: [
      {
        value: "PROFESSIONAL",
        icon: "business_center",
        label: "Professional",
        desc: "Formal, precise, and corporate. Ideal for B2B and enterprise.",
      },
      {
        value: "FRIENDLY",
        icon: "sentiment_very_satisfied",
        label: "Friendly",
        desc: "Warm, approachable, and conversational. Great for consumer brands.",
      },
      {
        value: "PERSUASIVE",
        icon: "auto_awesome",
        label: "Persuasive",
        desc: "Confident and compelling. Optimized for sales conversion.",
      },
      {
        value: "NEUTRAL",
        icon: "balance",
        label: "Neutral",
        desc: "Balanced and adaptable. Works well across any context.",
      },
    ],
  },
  {
    id: "audienceType",
    title: "Who are you primarily calling?",
    subtitle:
      "Understanding your audience helps us tailor the conversation scripts.",
    options: [
      {
        value: "COLD",
        icon: "person_off",
        label: "Cold Leads",
        desc: "Contacts with no prior interaction with your brand.",
      },
      {
        value: "WARM",
        icon: "local_fire_department",
        label: "Warm Leads",
        desc: "Prospects who have shown some interest or engagement.",
      },
      {
        value: "EXISTING",
        icon: "group",
        label: "Existing Customers",
        desc: "Current clients for upsell, renewal, or support follow-ups.",
      },
      {
        value: "MIXED",
        icon: "shuffle",
        label: "Mixed Audience",
        desc: "A blend of cold, warm, and existing contacts.",
      },
    ],
  },
  {
    id: "channels",
    title: "Which channels do you want to activate?",
    subtitle:
      "You can enable more channels anytime. Start with what matters most to your business.",
    options: [
      {
        value: "CALLING_ONLY",
        icon: "phone_in_talk",
        label: "Calling Only",
        desc: "Start with AI voice calls. Most powerful for direct outreach.",
      },
      {
        value: "CALLING_WHATSAPP",
        icon: "chat",
        label: "Calling + WhatsApp",
        desc: "Combine voice and messaging for higher reach rates.",
      },
      {
        value: "CALLING_EMAIL",
        icon: "mail",
        label: "Calling + Email",
        desc: "Follow up calls with automated email sequences.",
      },
      {
        value: "ALL_CHANNELS",
        icon: "hub",
        label: "All Channels",
        desc: "Full multi-channel outreach: calls, WhatsApp, Instagram, and email.",
      },
    ],
  },
];

// ─── Component ──────────────────────────────────────────────────────

interface OnboardingFlowProps {
  onComplete: (answers: IOnboardingAnswers) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.createUser({
      clerkId: "test-user-123",
      email: "test@worktf.ai",
      firstName: "John",
      lastName: "Doe",
    }).catch((err) => {
      console.error("Failed to create user on mount:", err);
    });
  }, []);

  const {
    currentStep: step,
    answers,
    isLastStep,
    goNext,
    goBack,
    selectAnswer,
    isSubmitting,
  } = useOnboarding({
    totalSteps: QUESTIONS.length,
    onComplete,
  });

  const currentQuestion = QUESTIONS[step];
  const currentAnswer = (answers as Record<string, string | undefined>)[currentQuestion.id];

  /** Go to previous step (minimum 0) */
  const handleBack = useCallback(() => {
    goBack();
  }, [goBack]);

  /** Store the selected value for the current question */
  const handleSelect = useCallback(
    (value: string) => {
      selectAnswer(currentQuestion.id, value);
    },
    [currentQuestion.id, selectAnswer],
  );

  /** Advance to next step or complete the flow */
  const handleContinue = useCallback(() => {
    goNext();
  }, [goNext]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Progress bar ───────────────────────────── */}
      <ProgressBar
        currentStep={step + 1}
        totalSteps={QUESTIONS.length}
        onBack={handleBack}
      />

      {/* ── Scrollable content area ────────────────── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 16px 140px",
        }}
      >
        <QuestionCard
          title={currentQuestion.title}
          subtitle={currentQuestion.subtitle}
          options={currentQuestion.options}
          selectedValue={currentAnswer}
          onSelect={handleSelect}
        />
      </div>

      {/* ── Fixed bottom CTA ───────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "24px 16px 32px",
          background:
            "linear-gradient(to top, var(--background) 70%, transparent)",
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <Button
          variant="primary"
          size="lg"
          fullWidth
          iconAfter="arrow_forward"
          disabled={!currentAnswer || isSubmitting}
          loading={isSubmitting}
          onClick={handleContinue}
          style={{ maxWidth: 480, borderRadius: "999px" }}
        >
          {isLastStep ? "Launch My Agent" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
