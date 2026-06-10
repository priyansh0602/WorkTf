import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Avatar, Badge, Card, Button, C } from "../../components/ui";
import { useCallStore, useAgentStore } from "../../store";

interface DashboardScreenProps {
  navigation: StackNavigationProp<any>;
}

function formatToday(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const CHANNELS = [
  { icon: "📞", label: "Calling", stat: "Active Voice", active: true },
  { icon: "💬", label: "WhatsApp", stat: "0 sessions", active: false },
  { icon: "📸", label: "Instagram", stat: "0 sessions", active: false },
  { icon: "✉️", label: "Email", stat: "0 sent", active: false },
];

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  const { fetchRecentCalls, fetchCallStats, recentCalls, callStats, isLoading } = useCallStore();
  const { fetchAgent, agent } = useAgentStore();

  useEffect(() => {
    fetchRecentCalls();
    fetchCallStats();
    fetchAgent();
  }, []);

  const activeAgent = agent?.is_active || false;
  const agentName = agent?.name || "Alex";
  const displayCalls = (recentCalls || []).slice(0, 5);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.subtitle}>{formatToday()}</Text>
          </View>
          <Button
            variant="primary"
            size="sm"
            onPress={() => navigation.navigate("Calls", { screen: "ActiveCall" })}
          >
            New Call
          </Button>
        </View>

        {/* Agent Status Card */}
        <Card style={styles.agentCard}>
          <View style={styles.agentRow}>
            <View style={[styles.statusIndicator, activeAgent ? styles.statusActive : styles.statusInactive]} />
            <View style={styles.agentInfo}>
              <Text style={styles.agentName}>Agent: {agentName}</Text>
              <Text style={styles.agentStateText}>
                {activeAgent ? "Listening for interactions" : "Offline"}
              </Text>
            </View>
            <Badge label={activeAgent ? "Active" : "Paused"} color={activeAgent ? "green" : "gray"} />
          </View>
        </Card>

        {/* Metrics Grid */}
        <Text style={styles.sectionHeader}>Analytics Summary</Text>
        <View style={styles.metricsGrid}>
          <Card style={styles.metricCard}>
            <Text style={styles.metricLabel}>TOTAL CALLS</Text>
            <Text style={styles.metricValue}>{callStats?.total?.toString() || "0"}</Text>
            <Text style={styles.metricDelta}>+12% this week</Text>
          </Card>
          <Card style={styles.metricCard}>
            <Text style={styles.metricLabel}>CONVERSION</Text>
            <Text style={styles.metricValue}>
              {callStats?.conversionRate ? `${callStats.conversionRate}%` : "0%"}
            </Text>
            <Text style={styles.metricDelta}>+2.4% vs last wk</Text>
          </Card>
          <Card style={styles.metricCard}>
            <Text style={styles.metricLabel}>ANSWERED</Text>
            <Text style={styles.metricValue}>{callStats?.answered?.toString() || "0"}</Text>
            <Text style={styles.metricDelta}>Answered calls</Text>
          </Card>
          <Card style={styles.metricCard}>
            <Text style={styles.metricLabel}>MISSED</Text>
            <Text style={styles.metricValue}>{callStats?.missed?.toString() || "0"}</Text>
            <Text style={styles.metricDelta}>Missed calls</Text>
          </Card>
        </View>

        {/* Active Channels */}
        <Text style={styles.sectionHeader}>Active Channels</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.channelsScroll}
        >
          {CHANNELS.map((ch) => {
            const isChannelActive = agent?.enabled_channels?.includes(ch.label.toUpperCase() as any) || ch.active;
            return (
              <Card key={ch.label} style={styles.channelCard}>
                <View style={styles.channelHeader}>
                  <Text style={styles.channelIcon}>{ch.icon}</Text>
                  <Badge label={isChannelActive ? "ON" : "OFF"} color={isChannelActive ? "primary" : "gray"} />
                </View>
                <Text style={styles.channelLabel}>{ch.label}</Text>
                <Text style={styles.channelStat}>{ch.stat}</Text>
              </Card>
            );
          })}
        </ScrollView>

        {/* Recent Calls */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeader}>Recent Calls</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Calls", { screen: "CallLogs" })}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recentCallsContainer}>
          {displayCalls.length === 0 ? (
            <Text style={styles.emptyText}>No recent calls.</Text>
          ) : (
            displayCalls.map((call) => {
              const nameParts = call.contactName.split(" ");
              const first = nameParts[0] || "";
              const last = nameParts.slice(1).join(" ") || "";
              return (
                <Card key={call.id} style={styles.callCard}>
                  <View style={styles.callRow}>
                    <Avatar firstName={first} lastName={last} size="md" />
                    <View style={styles.callMeta}>
                      <Text style={styles.contactName}>{call.contactName}</Text>
                      <Text style={styles.contactNumber}>{call.contactNumber}</Text>
                    </View>
                    {call.outcome && (
                      <Badge
                        label={call.outcome}
                        color={
                          call.outcome === "CONVERTED"
                            ? "green"
                            : call.outcome === "ANSWERED"
                            ? "primary"
                            : "red"
                        }
                      />
                    )}
                  </View>
                </Card>
              );
            })
          )}
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
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: C.onSurface,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 13,
    color: C.onSurfaceVariant,
    marginTop: 2,
    fontFamily: "System",
  },
  agentCard: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  agentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  statusActive: {
    backgroundColor: "#16a34a",
  },
  statusInactive: {
    backgroundColor: C.outline,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 15,
    fontWeight: "700",
    color: C.onSurface,
    fontFamily: "System",
  },
  agentStateText: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    marginTop: 2,
    fontFamily: "System",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: C.onSurface,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontFamily: "System",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
    marginTop: 20,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: C.primary,
    fontFamily: "System",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  metricCard: {
    width: "46%",
    marginHorizontal: "2%",
    marginBottom: 12,
    padding: 12,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: C.onSurfaceVariant,
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "700",
    color: C.primary,
    marginVertical: 4,
    fontFamily: "System",
  },
  metricDelta: {
    fontSize: 11,
    color: C.onSurfaceVariant,
    fontFamily: "System",
  },
  channelsScroll: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  channelCard: {
    width: 130,
    marginRight: 12,
    padding: 12,
  },
  channelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  channelIcon: {
    fontSize: 20,
  },
  channelLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: C.onSurface,
    fontFamily: "System",
  },
  channelStat: {
    fontSize: 11,
    color: C.onSurfaceVariant,
    marginTop: 2,
    fontFamily: "System",
  },
  recentCallsContainer: {
    paddingHorizontal: 16,
  },
  callCard: {
    marginBottom: 8,
    padding: 12,
  },
  callRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  callMeta: {
    flex: 1,
    marginLeft: 12,
  },
  contactName: {
    fontSize: 14,
    fontWeight: "700",
    color: C.onSurface,
    fontFamily: "System",
  },
  contactNumber: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    marginTop: 2,
    fontFamily: "System",
  },
  emptyText: {
    textAlign: "center",
    color: C.onSurfaceVariant,
    paddingVertical: 16,
    fontFamily: "System",
  },
});
