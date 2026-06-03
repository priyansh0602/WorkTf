/**
 * useOnboarding — Hook managing onboarding flow state.
 *
 * Tracks current step, collected answers, progress percentage,
 * and provides navigation controls for the wizard.
 */

import { useState, useCallback, useMemo } from "react";
import type { IOnboardingAnswers } from "@worktf/shared";

interface UseOnboardingOptions {
  totalSteps: number;
  onComplete: (answers: IOnboardingAnswers) => void;
}

interface UseOnboardingReturn {
  /** Current step index (0-based) */
  currentStep: number;
  /** Collected answers so far */
  answers: Partial<IOnboardingAnswers>;
  /** Progress percentage (0–100) */
  progress: number;
  /** True when the current question has an answer */
  canGoNext: boolean;
  /** True when on the final step */
  isLastStep: boolean;
  /** Advance to the next step or complete */
  goNext: () => void;
  /** Go back one step (minimum 0) */
  goBack: () => void;
  /** Record an answer for a question */
  selectAnswer: (questionId: string, value: string) => void;
}

/** Question IDs in order — used to check if current step is answered. */
const QUESTION_IDS = ["useCase", "callVolume", "agentTone", "audienceType"];

export function useOnboarding({
  totalSteps,
  onComplete,
}: UseOnboardingOptions): UseOnboardingReturn {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<IOnboardingAnswers>>({});

  const isLastStep = currentStep === totalSteps - 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  /** Check if the current question has been answered. */
  const canGoNext = useMemo(() => {
    const questionId = QUESTION_IDS[currentStep];
    if (!questionId) return false;
    return (answers as Record<string, string | undefined>)[questionId] !== undefined;
  }, [currentStep, answers]);

  /** Advance to next step or trigger completion. */
  const goNext = useCallback(() => {
    if (isLastStep) {
      onComplete(answers as IOnboardingAnswers);
    } else {
      setCurrentStep((s) => s + 1);
    }
  }, [isLastStep, answers, onComplete]);

  /** Go back one step, minimum 0. */
  const goBack = useCallback(() => {
    setCurrentStep((s) => Math.max(0, s - 1));
  }, []);

  /** Record an answer for a specific question. */
  const selectAnswer = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  return {
    currentStep,
    answers,
    progress,
    canGoNext,
    isLastStep,
    goNext,
    goBack,
    selectAnswer,
  };
}
