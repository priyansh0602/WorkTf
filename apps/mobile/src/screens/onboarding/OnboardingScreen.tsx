import React, { useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, C } from "../../components/ui";
import { useOnboarding } from "../../hooks/useOnboarding";
import { useUserStore } from "../../store";

interface OnboardingScreenProps {
  navigation: StackNavigationProp<any>;
}

const QUESTIONS = [
  {
    id: "useCase",
    title: "What is your primary use case?",
    subtitle: "Select the option that best describes your immediate need to help us configure your AI.",
    options: [
      { value: "LEAD_QUALIFICATION", label: "Lead Qualification", desc: "Automatically vet inbound inquiries and capture essential prospect data.", icon: "👤" },
      { value: "APPOINTMENT_BOOKING", label: "Appointment Booking", desc: "Schedule meetings seamlessly integrated with your team's calendar.", icon: "📅" },
      { value: "CUSTOMER_SUPPORT", label: "Customer Support", desc: "Handle tier-1 queries, troubleshoot common issues, and route complex cases.", icon: "🛠️" },
      { value: "OUTBOUND_SALES", label: "Outbound Sales", desc: "Initiate proactive outreach campaigns and gauge initial prospect interest.", icon: "📞" },
    ]
  },
  {
    id: "callVolume",
    title: "What's your expected call volume?",
    subtitle: "This helps us allocate the right resources for your agent.",
    options: [
      { value: "LOW", label: "Low (< 50/day)", desc: "Just getting started or testing the waters.", icon: "📊" },
      { value: "MEDIUM", label: "Medium (50–200/day)", desc: "Growing team with consistent outreach needs.", icon: "📈" },
      { value: "HIGH", label: "High (200–500/day)", desc: "Established sales or support operations.", icon: "🚀" },
      { value: "ENTERPRISE", label: "Enterprise (500+/day)", desc: "Large-scale deployment across multiple teams.", icon: "🏢" },
    ]
  },
  {
    id: "agentTone",
    title: "What tone should your AI agent use?",
    subtitle: "Choose the voice personality that best represents your brand.",
    options: [
      { value: "PROFESSIONAL", label: "Professional", desc: "Formal, precise, and corporate. Ideal for B2B and enterprise.", icon: "💼" },
      { value: "FRIENDLY", label: "Friendly", desc: "Warm, approachable, and conversational. Great for consumer brands.", icon: "😊" },
      { value: "PERSUASIVE", label: "Persuasive", desc: "Confident and compelling. Optimized for sales conversion.", icon: "⚡" },
      { value: "NEUTRAL", label: "Neutral", desc: "Balanced and adaptable. Works well across any context.", icon: "⚖️" },
    ]
  },
  {
    id: "audienceType",
    title: "Who are you primarily calling?",
    subtitle: "Understanding your audience helps us tailor the conversation scripts.",
    options: [
      { value: "COLD", label: "Cold Leads", desc: "Contacts with no prior interaction with your brand.", icon: "❄️" },
      { value: "WARM", label: "Warm Leads", desc: "Prospects who have shown some interest or engagement.", icon: "🔥" },
      { value: "EXISTING", label: "Existing Customers", desc: "Current clients for upsell, renewal, or support follow-ups.", icon: "👥" },
      { value: "MIXED", label: "Mixed Audience", desc: "A blend of cold, warm, and existing contacts.", icon: "🔀" },
    ]
  },
  {
    id: "channels",
    title: "Which channels do you want to activate?",
    subtitle: "You can enable more channels anytime. Start with what matters most to your business.",
    options: [
      { value: "CALLING_ONLY", label: "Calling Only", desc: "Start with AI voice calls. Most powerful for direct outreach.", icon: "📞" },
      { value: "CALLING_WHATSAPP", label: "Calling + WhatsApp", desc: "Combine voice and messaging for higher reach rates.", icon: "💬" },
      { value: "CALLING_EMAIL", label: "Calling + Email", desc: "Follow up calls with automated email sequences.", icon: "✉️" },
      { value: "ALL_CHANNELS", label: "All Channels", desc: "Full multi-channel outreach: calls, WhatsApp, Instagram, and email.", icon: "🔌" },
    ]
  }
];

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.createUser({
      clerkId: "test-user-123",
      email: "test@worktf.ai",
      firstName: "John",
      lastName: "Doe",
    }).catch((err) => {
      console.error("Failed to create user in mobile onboarding:", err);
    });
  }, []);

  const handleComplete = useCallback(() => {
    navigation.navigate("App");
  }, [navigation]);

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
    onComplete: handleComplete,
  });

  const currentQuestion = QUESTIONS[step];
  const currentAnswer = (answers as Record<string, string | undefined>)[currentQuestion.id];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${((step + 1) / QUESTIONS.length) * 100}%` },
          ]}
        />
      </View>

      {/* Header Row */}
      <View style={styles.header}>
        {step > 0 ? (
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backButtonPlaceholder} />
        )}
        <Text style={styles.counterText}>
          Step {step + 1} of {QUESTIONS.length}
        </Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
        <Text style={styles.title}>{currentQuestion.title}</Text>
        <Text style={styles.subtitle}>{currentQuestion.subtitle}</Text>

        {currentQuestion.options.map((opt) => {
          const isSelected = currentAnswer === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              activeOpacity={0.8}
              onPress={() => selectAnswer(currentQuestion.id, opt.value)}
              style={[
                styles.optionTile,
                isSelected ? styles.selectedTile : styles.unselectedTile,
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  isSelected ? styles.selectedIconBg : styles.unselectedIconBg,
                ]}
              >
                <Text style={styles.iconText}>{opt.icon}</Text>
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionLabel}>{opt.label}</Text>
                <Text style={styles.optionDesc}>{opt.desc}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCta}>
        <Button
          variant="primary"
          fullWidth
          size="lg"
          disabled={!currentAnswer || isSubmitting}
          loading={isSubmitting}
          onPress={goNext}
        >
          {isLastStep ? "Launch My Agent" : "Continue"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.bg,
  },
  progressContainer: {
    height: 4,
    backgroundColor: C.surfaceHigh,
    marginHorizontal: 16,
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: C.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  backButtonPlaceholder: {
    width: 30,
  },
  backText: {
    fontSize: 20,
    fontWeight: "700",
    color: C.onSurface,
    fontFamily: "System",
  },
  counterText: {
    fontSize: 14,
    color: C.onSurfaceVariant,
    fontWeight: "500",
    fontFamily: "System",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: C.onSurface,
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 14,
    color: C.onSurfaceVariant,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
    fontFamily: "System",
  },
  optionTile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  selectedTile: {
    borderColor: C.primary,
    backgroundColor: C.surfaceLow,
  },
  unselectedTile: {
    borderColor: C.outlineVariant,
    backgroundColor: C.surfaceLowest,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  selectedIconBg: {
    backgroundColor: C.primaryFixed,
  },
  unselectedIconBg: {
    backgroundColor: C.surfaceContainer,
  },
  iconText: {
    fontSize: 22,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: C.onSurface,
    marginBottom: 4,
    fontFamily: "System",
  },
  optionDesc: {
    fontSize: 13,
    color: C.onSurfaceVariant,
    lineHeight: 18,
    fontFamily: "System",
  },
  bottomCta: {
    padding: 16,
    backgroundColor: C.bg,
  },
});
