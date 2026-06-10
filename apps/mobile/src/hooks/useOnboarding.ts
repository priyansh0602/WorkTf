import { useState, useCallback, useMemo } from "react";
import type { IOnboardingAnswers } from "../types";
import { apiClient } from "../lib/api";

interface UseOnboardingOptions {
  totalSteps: number;
  onComplete: (answers: IOnboardingAnswers) => void;
}

interface UseOnboardingReturn {
  currentStep: number;
  answers: Partial<IOnboardingAnswers>;
  progress: number;
  canGoNext: boolean;
  isLastStep: boolean;
  goNext: () => void;
  goBack: () => void;
  selectAnswer: (questionId: string, value: string) => void;
  isSubmitting: boolean;
}

const QUESTION_IDS = ["useCase", "callVolume", "agentTone", "audienceType", "channels"];

export function useOnboarding({
  totalSteps,
  onComplete,
}: UseOnboardingOptions): UseOnboardingReturn {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<IOnboardingAnswers>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLastStep = currentStep === totalSteps - 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const canGoNext = useMemo(() => {
    const questionId = QUESTION_IDS[currentStep];
    if (!questionId) return false;
    return (answers as Record<string, string | undefined>)[questionId] !== undefined;
  }, [currentStep, answers]);

  const goNext = useCallback(async () => {
    if (isLastStep) {
      setIsSubmitting(true);
      try {
        await apiClient.post("users/onboarding", {
          useCase: answers.useCase,
          callVolume: answers.callVolume,
          agentTone: answers.agentTone,
          audienceType: answers.audienceType,
          channels: answers.channels,
        });
        onComplete(answers as IOnboardingAnswers);
      } catch (error) {
        console.error("Onboarding submission failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStep((s) => s + 1);
    }
  }, [isLastStep, answers, onComplete]);

  const goBack = useCallback(() => {
    setCurrentStep((s) => Math.max(0, s - 1));
  }, []);

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
    isSubmitting,
  };
}
