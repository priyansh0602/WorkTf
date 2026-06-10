import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Avatar, Card, Toggle, Button, C } from "../../components/ui";
import { useUserStore } from "../../store";

export default function SettingsScreen() {
  const { user, fetchUser, clearUser } = useUserStore();
  const [notifyInbound, setNotifyInbound] = useState(true);
  const [notifyOutbound, setNotifyOutbound] = useState(true);
  const [notifyDigest, setNotifyDigest] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSignOut = useCallback(() => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          clearUser();
        },
      },
    ]);
  }, [clearUser]);

  const firstName = user?.firstName || "John";
  const lastName = user?.lastName || "Doe";
  const name = `${firstName} ${lastName}`;
  const email = user?.email || "test@worktf.ai";
  const plan = user?.plan || "PRO";

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
        {/* Profile Card */}
        <Card style={styles.card}>
          <View style={styles.profileRow}>
            <Avatar firstName={firstName} lastName={lastName} size="lg" />
            <View style={styles.profileMeta}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileEmail}>{email}</Text>
              <View style={styles.planContainer}>
                <BadgeText label={`${plan} PLAN`} />
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Notifications Card */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Inbound Call Alerts</Text>
            <Toggle on={notifyInbound} onChange={setNotifyInbound} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Outbound Call Alerts</Text>
            <Toggle on={notifyOutbound} onChange={setNotifyOutbound} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Weekly Analytics Digest</Text>
            <Toggle on={notifyDigest} onChange={setNotifyDigest} />
          </View>
        </Card>

        {/* Security Card */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Security</Text>
          <TouchableOpacity style={styles.securityRow}>
            <Text style={styles.securityLabel}>Change Password</Text>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.securityRow}>
            <Text style={styles.securityLabel}>Biometric Access Lock</Text>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.securityRow}>
            <Text style={styles.securityLabel}>Two-Factor Authentication</Text>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </Card>

        {/* Sign Out Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSignOut}
          style={styles.signOutButton}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Inline small badge component
function BadgeText({ label }: { label: string }) {
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileMeta: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "700",
    color: C.onSurface,
    fontFamily: "System",
  },
  profileEmail: {
    fontSize: 13,
    color: C.onSurfaceVariant,
    marginTop: 2,
    fontFamily: "System",
  },
  planContainer: {
    marginTop: 6,
    alignSelf: "flex-start",
  },
  badgeContainer: {
    backgroundColor: C.primaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: C.primary,
    fontFamily: "System",
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    backgroundColor: C.surfaceLowest,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: C.primary,
    fontFamily: "System",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: C.onSurface,
    marginBottom: 16,
    fontFamily: "System",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.surfaceLow,
  },
  toggleLabel: {
    fontSize: 14,
    color: C.onSurface,
    fontWeight: "500",
    fontFamily: "System",
  },
  securityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.surfaceLow,
  },
  securityLabel: {
    fontSize: 14,
    color: C.onSurface,
    fontWeight: "500",
    fontFamily: "System",
  },
  arrowIcon: {
    fontSize: 18,
    color: C.onSurfaceVariant,
    fontWeight: "600",
  },
  signOutButton: {
    backgroundColor: C.errorContainer,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: "700",
    color: C.onErrorContainer,
    fontFamily: "System",
  },
});
