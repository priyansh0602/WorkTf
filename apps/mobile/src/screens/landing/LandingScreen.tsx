import React from "react";
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Card, C } from "../../components/ui";

interface LandingScreenProps {
  navigation: StackNavigationProp<any>;
}

export default function LandingScreen({ navigation }: LandingScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>WorkTF AI</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>{"Human-like AI calling\nfor your business"}</Text>
          <Text style={styles.heroSubtitle}>
            Automate phone outreach and inbound lead qualifying with lifelike conversational AI voice agents.
          </Text>
          <Button
            variant="primary"
            fullWidth
            onPress={() => navigation.navigate("Onboarding")}
          >
            Get Started — It's Free
          </Button>
          <Text style={styles.loginText}>Already have an account? Log In</Text>
        </View>

        {/* Features Section */}
        <View style={styles.features}>
          <Card style={styles.featureCard}>
            <Text style={styles.featureTitle}>24/7 Availability</Text>
            <Text style={styles.featureDesc}>
              AI agents resolve inquiries and book appointments round the clock, ensuring zero lead leakage.
            </Text>
          </Card>

          <Card style={styles.featureCard}>
            <Text style={styles.featureTitle}>Natural Voice</Text>
            <Text style={styles.featureDesc}>
              Using state-of-the-art voice generation for seamless, conversational, and natural dialogs.
            </Text>
          </Card>

          <Card style={styles.featureCard}>
            <Text style={styles.featureTitle}>Instant Setup</Text>
            <Text style={styles.featureDesc}>
              Launch outbound lead qualification or support booking agents in minutes without any code.
            </Text>
          </Card>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 WorkTF AI</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 24,
  },
  header: {
    padding: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "700",
    color: C.primary,
    fontFamily: "System",
  },
  hero: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: C.onSurface,
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 16,
    fontFamily: "System",
  },
  heroSubtitle: {
    fontSize: 16,
    color: C.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
    fontFamily: "System",
  },
  loginText: {
    fontSize: 14,
    color: C.onSurfaceVariant,
    textAlign: "center",
    marginTop: 16,
    fontFamily: "System",
  },
  features: {
    padding: 16,
  },
  featureCard: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: C.onSurface,
    marginBottom: 6,
    fontFamily: "System",
  },
  featureDesc: {
    fontSize: 14,
    color: C.onSurfaceVariant,
    lineHeight: 20,
    fontFamily: "System",
  },
  footer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    fontFamily: "System",
  },
});
