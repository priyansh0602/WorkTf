import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Avatar, Button, C } from "../../components/ui";
import { useCallStore } from "../../store";
import { useCallTimer } from "../../hooks/useCallTimer";

interface ActiveCallScreenProps {
  navigation: StackNavigationProp<any>;
}

export default function ActiveCallScreen({ navigation }: ActiveCallScreenProps) {
  const { activeCall, clearActiveCall } = useCallStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);

  const timer = useCallTimer({
    startedAt: activeCall?.startedAt ? new Date(activeCall.startedAt) : new Date(),
    autoStart: true,
  });

  const anims = useRef(
    Array.from({ length: 7 }, () => new Animated.Value(12))
  ).current;

  useEffect(() => {
    let animations: Animated.CompositeAnimation[] = [];
    if (activeCall && !isOnHold) {
      animations = anims.map((anim, i) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 20 + Math.random() * 40,
              duration: 300 + i * 80,
              useNativeDriver: false,
            }),
            Animated.timing(anim, {
              toValue: 12,
              duration: 300 + i * 80,
              useNativeDriver: false,
            }),
          ])
        );
      });
      Animated.parallel(animations).start();
    } else {
      anims.forEach((anim) => anim.setValue(12));
    }

    return () => {
      animations.forEach((a) => a.stop());
    };
  }, [activeCall, isOnHold, anims]);

  const handleEndCall = useCallback(() => {
    clearActiveCall();
    navigation.goBack();
  }, [clearActiveCall, navigation]);

  if (!activeCall) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No active call in progress</Text>
          <Button variant="primary" onPress={() => navigation.goBack()}>
            Go Back to Dashboard
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const nameParts = activeCall.contactName.split(" ");
  const first = nameParts[0] || "";
  const last = nameParts.slice(1).join(" ") || "";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.headerTitle}>Active Call</Text>

        {/* Status Pill */}
        <View style={styles.statusRow}>
          <View style={styles.statusPill}>
            <View style={styles.pulseDot} />
            <Text style={styles.statusText}>Active AI Core</Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.contactContainer}>
          <Avatar firstName={first} lastName={last} size="xl" />
          <Text style={styles.contactName}>{activeCall.contactName}</Text>
          <Text style={styles.contactNumber}>{activeCall.contactNumber}</Text>
        </View>

        {/* Waveform & Timer Container */}
        <View style={styles.waveformContainer}>
          <View style={styles.waveformRow}>
            {anims.map((anim, idx) => (
              <Animated.View
                key={idx}
                style={[
                  styles.waveBar,
                  { height: anim },
                ]}
              />
            ))}
          </View>

          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>DURATION</Text>
            <Text style={styles.timerText}>{timer.formatted}</Text>
          </View>

          <Text style={styles.secureText}>🔒 End-to-end encrypted</Text>
        </View>

        {/* Control Buttons Row */}
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[styles.controlButton, isMuted && styles.controlButtonActive]}
            onPress={() => setIsMuted(!isMuted)}
          >
            <Text style={[styles.controlIcon, isMuted && styles.controlIconActive]}>
              {isMuted ? "🎙️" : "🔇"}
            </Text>
            <Text style={styles.controlLabel}>Mute</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, isOnHold && styles.controlButtonActive]}
            onPress={() => setIsOnHold(!isOnHold)}
          >
            <Text style={[styles.controlIcon, isOnHold && styles.controlIconActive]}>
              ⏸️
            </Text>
            <Text style={styles.controlLabel}>Hold</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlIcon}>📝</Text>
            <Text style={styles.controlLabel}>Note</Text>
          </TouchableOpacity>
        </View>

        {/* End Call Button */}
        <View style={styles.endCallContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleEndCall}
            style={styles.endCallButton}
          >
            <Text style={styles.endCallIcon}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: C.onSurface,
    textAlign: "center",
    paddingVertical: 16,
    fontFamily: "System",
  },
  statusRow: {
    alignItems: "center",
    marginBottom: 24,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surfaceContainer,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: C.outlineVariant,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.primary,
    marginRight: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: C.primary,
    fontFamily: "System",
  },
  contactContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  contactName: {
    fontSize: 22,
    fontWeight: "700",
    color: C.onSurface,
    marginTop: 12,
    marginBottom: 4,
    fontFamily: "System",
  },
  contactNumber: {
    fontSize: 16,
    color: C.onSurfaceVariant,
    fontFamily: "System",
  },
  waveformContainer: {
    backgroundColor: C.inverseSurface,
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  waveformRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    gap: 6,
  },
  waveBar: {
    width: 6,
    borderRadius: 3,
    backgroundColor: C.primaryFixedDim,
  },
  timerContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  timerLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: C.outlineVariant,
    letterSpacing: 1,
    marginBottom: 4,
    fontFamily: "System",
  },
  timerText: {
    fontSize: 36,
    fontWeight: "700",
    color: C.primaryFixedDim,
    fontFamily: "System",
  },
  secureText: {
    fontSize: 11,
    color: C.outlineVariant,
    marginTop: 16,
    fontFamily: "System",
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    marginBottom: 32,
  },
  controlButton: {
    alignItems: "center",
  },
  controlButtonActive: {
    opacity: 0.7,
  },
  controlIcon: {
    fontSize: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: C.surfaceContainer,
    textAlign: "center",
    lineHeight: 48,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    color: C.onSurface,
  },
  controlIconActive: {
    backgroundColor: C.primaryFixed,
    color: C.primary,
  },
  controlLabel: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    marginTop: 8,
    fontWeight: "500",
    fontFamily: "System",
  },
  endCallContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 24,
  },
  endCallButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: C.error,
    alignItems: "center",
    justifyContent: "center",
  },
  endCallIcon: {
    fontSize: 28,
    color: C.onError,
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: C.onSurfaceVariant,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "System",
  },
});
