import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Card, Badge, C } from "../../components/ui";
import { useAgentStore } from "../../store";

interface MessagingHubScreenProps {
  navigation: StackNavigationProp<any>;
}

const CHANNEL_CARDS = [
  {
    id: "WhatsApp",
    title: "WhatsApp Business",
    desc: "Engage customers on the world's most popular messaging app.",
    icon: "💬",
    iconBg: "#e6fcf5",
    iconColor: "#099268",
    channelKey: "WHATSAPP",
  },
  {
    id: "Instagram",
    title: "Instagram Direct",
    desc: "Interact with customers via direct messages and replies.",
    icon: "📸",
    iconBg: "#fff0f6",
    iconColor: "#d6336c",
    channelKey: "INSTAGRAM",
  },
  {
    id: "Email",
    title: "Email Client",
    desc: "Manage email conversations and follow-up templates.",
    icon: "✉️",
    iconBg: "#edf2ff",
    iconColor: "#3b5bdb",
    channelKey: "EMAIL",
  },
];

export default function MessagingHubScreen({ navigation }: MessagingHubScreenProps) {
  const { agent, fetchAgent } = useAgentStore();

  useEffect(() => {
    fetchAgent();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messaging Channels</Text>
        <Text style={styles.headerSubtitle}>Select a channel to manage conversations</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
        {CHANNEL_CARDS.map((ch) => {
          const isChannelActive = agent?.enabled_channels?.includes(ch.channelKey as any) ?? false;
          return (
            <Card key={ch.id} style={styles.channelCard}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate(ch.id)}
                style={styles.cardPressable}
              >
                <View style={[styles.iconContainer, { backgroundColor: ch.iconBg }]}>
                  <Text style={styles.channelIcon}>{ch.icon}</Text>
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.channelTitle}>{ch.title}</Text>
                    <Badge
                      label={isChannelActive ? "ACTIVE" : "PAUSED"}
                      color={isChannelActive ? "primary" : "gray"}
                    />
                  </View>
                  <Text style={styles.channelDesc}>{ch.desc}</Text>
                </View>
                <Text style={styles.arrowIcon}>›</Text>
              </TouchableOpacity>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.bg,
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: C.onSurface,
    fontFamily: "System",
  },
  headerSubtitle: {
    fontSize: 13,
    color: C.onSurfaceVariant,
    marginTop: 4,
    fontFamily: "System",
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  channelCard: {
    marginBottom: 16,
    padding: 0,
    overflow: "hidden",
  },
  cardPressable: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  channelIcon: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  channelTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: C.onSurface,
    fontFamily: "System",
  },
  channelDesc: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    lineHeight: 16,
    fontFamily: "System",
  },
  arrowIcon: {
    fontSize: 20,
    color: C.outline,
    fontWeight: "600",
  },
});
