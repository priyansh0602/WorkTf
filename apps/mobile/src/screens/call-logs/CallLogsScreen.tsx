import React, { useState, useMemo, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  SectionList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Avatar, Badge, Card, C } from "../../components/ui";
import { useCallStore } from "../../store";
import type { ICall } from "../../types";

const FILTER_OPTIONS = ["All", "Converted", "Answered", "Missed", "Voicemail", "Failed"];

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function getDateLabel(dateStr: any): string {
  const d = new Date(dateStr);
  const todayStr = new Date().toDateString();
  const yesterdayStr = new Date(Date.now() - 86400000).toDateString();
  if (d.toDateString() === todayStr) return "Today";
  if (d.toDateString() === yesterdayStr) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function groupByDate(calls: ICall[]): Record<string, ICall[]> {
  const groups: Record<string, ICall[]> = {};
  for (const call of calls) {
    const label = getDateLabel(call.createdAt);
    if (!groups[label]) groups[label] = [];
    groups[label].push(call);
  }
  return groups;
}

export default function CallLogsScreen() {
  const { fetchRecentCalls, recentCalls, isLoading } = useCallStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchRecentCalls();
  }, []);

  const filteredCalls = useMemo(() => {
    let result = recentCalls || [];

    if (filter !== "All") {
      result = result.filter(
        (c) => c.outcome && c.outcome.toUpperCase() === filter.toUpperCase()
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.contactName.toLowerCase().includes(q) ||
          c.contactNumber.toLowerCase().includes(q)
      );
    }

    return result;
  }, [recentCalls, search, filter]);

  const sections = useMemo(() => {
    const grouped = groupByDate(filteredCalls);
    return Object.keys(grouped).map((label) => ({
      title: label,
      data: grouped[label],
    }));
  }, [filteredCalls]);

  const getOutcomeColor = (outcome?: string) => {
    switch (outcome) {
      case "CONVERTED":
        return "green";
      case "ANSWERED":
        return "primary";
      case "MISSED":
      case "FAILED":
        return "red";
      case "VOICEMAIL":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Call Logs</Text>
      </View>

      {/* Search Box */}
      <TextInput
        style={styles.searchBar}
        value={search}
        onChangeText={setSearch}
        placeholder="Search contacts..."
        placeholderTextColor={C.onSurfaceVariant}
      />

      {/* Filter Chips */}
      <View style={styles.filterOuter}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {FILTER_OPTIONS.map((opt) => {
            const isActive = filter === opt;
            return (
              <TouchableOpacity
                key={opt}
                activeOpacity={0.8}
                onPress={() => setFilter(opt)}
                style={[styles.chip, isActive && styles.chipActive]}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Grouped Logs */}
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={C.primary} size="large" />
        </View>
      ) : sections.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No call logs match your query.</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionTitle}>{title}</Text>
          )}
          renderItem={({ item }) => {
            const nameParts = item.contactName.split(" ");
            const first = nameParts[0] || "";
            const last = nameParts.slice(1).join(" ") || "";
            return (
              <Card style={styles.callCard}>
                <View style={styles.itemRow}>
                  <Avatar firstName={first} lastName={last} size="md" />
                  <View style={styles.itemMeta}>
                    <Text style={styles.contactName}>{item.contactName}</Text>
                    <Text style={styles.contactNumber}>
                      {item.direction === "INBOUND" ? "📥 " : "📤 "}{item.contactNumber}
                    </Text>
                  </View>
                  <View style={styles.itemRight}>
                    {item.outcome && (
                      <Badge label={item.outcome} color={getOutcomeColor(item.outcome)} />
                    )}
                    <Text style={styles.durationText}>
                      {item.duration ? formatDuration(item.duration) : "—"}
                    </Text>
                  </View>
                </View>
              </Card>
            );
          }}
        />
      )}
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
  searchBar: {
    backgroundColor: C.surfaceLow,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    fontSize: 14,
    color: C.onSurface,
    fontFamily: "System",
    borderWidth: 1,
    borderColor: C.outlineVariant,
  },
  filterOuter: {
    marginBottom: 12,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: C.surfaceLowest,
    borderWidth: 1,
    borderColor: C.outlineVariant,
  },
  chipActive: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: C.onSurfaceVariant,
    fontFamily: "System",
  },
  chipTextActive: {
    color: C.onPrimary,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: C.onSurfaceVariant,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginVertical: 12,
    fontFamily: "System",
  },
  callCard: {
    marginBottom: 8,
    padding: 12,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemMeta: {
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
  itemRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  durationText: {
    fontSize: 11,
    color: C.onSurfaceVariant,
    fontFamily: "System",
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 14,
    color: C.onSurfaceVariant,
    textAlign: "center",
    fontFamily: "System",
  },
});
