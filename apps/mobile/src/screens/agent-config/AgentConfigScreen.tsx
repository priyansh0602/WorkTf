import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import { Card, Toggle, Button, C } from "../../components/ui";
import { useAgentStore } from "../../store";

const VOICE_OPTIONS = [
  { value: "PROFESSIONAL_MALE", label: "Professional Male" },
  { value: "PROFESSIONAL_FEMALE", label: "Professional Female" },
  { value: "FRIENDLY_MALE", label: "Friendly Male" },
  { value: "FRIENDLY_FEMALE", label: "Friendly Female" },
];

export default function AgentConfigScreen() {
  const { fetchAgent, saveAgent, agent, isSaving } = useAgentStore();

  const [name, setName] = useState("Alex");
  const [voiceStyle, setVoiceStyle] = useState("PROFESSIONAL_MALE");
  const [goal, setGoal] = useState("");
  const [inboundEnabled, setInboundEnabled] = useState(true);
  const [outboundEnabled, setOutboundEnabled] = useState(true);
  const [voicemailDetection, setVoicemailDetection] = useState(false);
  const [callRecording, setCallRecording] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchAgent();
  }, []);

  useEffect(() => {
    if (agent) {
      setName(agent.name || "Alex");
      setVoiceStyle(agent.voice_style || "PROFESSIONAL_MALE");
      setGoal(agent.goal || "");
      setInboundEnabled(!!agent.inbound_enabled);
      setOutboundEnabled(!!agent.outbound_enabled);
      setVoicemailDetection(!!agent.voicemail_detection);
      setCallRecording(!!agent.call_recording);
    }
  }, [agent]);

  const voiceStyleLabel = useMemo(() => {
    return VOICE_OPTIONS.find((opt) => opt.value === voiceStyle)?.label || voiceStyle;
  }, [voiceStyle]);

  const handleSave = useCallback(async () => {
    try {
      await saveAgent({
        name,
        voice_style: voiceStyle,
        goal,
        inbound_enabled: inboundEnabled,
        outbound_enabled: outboundEnabled,
        voicemail_detection: voicemailDetection,
        call_recording: callRecording,
      });
      Alert.alert("Success", "Agent configuration saved successfully.");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to save configuration.");
    }
  }, [saveAgent, name, voiceStyle, goal, inboundEnabled, outboundEnabled, voicemailDetection, callRecording]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Agent Config</Text>
        <Button
          variant="primary"
          size="sm"
          loading={isSaving}
          onPress={handleSave}
        >
          Save
        </Button>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
        {/* Agent Identity Card */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Agent Identity</Text>
          
          <Text style={styles.fieldLabel}>AGENT NAME</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="e.g. Alex"
            placeholderTextColor={C.onSurfaceVariant}
          />

          <Text style={styles.fieldLabel}>VOICE STYLE</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setModalVisible(true)}
            style={styles.selectTrigger}
          >
            <Text style={styles.selectText}>{voiceStyleLabel}</Text>
            <Text style={styles.selectIcon}>▼</Text>
          </TouchableOpacity>
        </Card>

        {/* Mission Card */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Mission & Goal</Text>
          
          <Text style={styles.fieldLabel}>AGENT MISSION GOAL</Text>
          <TextInput
            style={[styles.textInput, styles.multilineInput]}
            value={goal}
            onChangeText={setGoal}
            placeholder="e.g. Qualify inbound leads and book appointments..."
            placeholderTextColor={C.onSurfaceVariant}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </Card>

        {/* Capabilities Card */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Capabilities</Text>
          
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Inbound Calling</Text>
            <Toggle on={inboundEnabled} onChange={setInboundEnabled} />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Outbound Calling</Text>
            <Toggle on={outboundEnabled} onChange={setOutboundEnabled} />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Voicemail Detection</Text>
            <Toggle on={voicemailDetection} onChange={setVoicemailDetection} />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Call Recording</Text>
            <Toggle on={callRecording} onChange={setCallRecording} />
          </View>
        </Card>

        <Button
          variant="primary"
          fullWidth
          size="lg"
          loading={isSaving}
          onPress={handleSave}
          style={styles.bottomSaveButton}
        >
          Save Configuration
        </Button>
      </ScrollView>

      {/* Voice Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Voice Style</Text>
            {VOICE_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                activeOpacity={0.8}
                style={[
                  styles.modalOption,
                  opt.value === voiceStyle && styles.modalOptionSelected,
                ]}
                onPress={() => {
                  setVoiceStyle(opt.value);
                  setModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    opt.value === voiceStyle && styles.modalOptionTextSelected,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
            <Button
              variant="secondary"
              fullWidth
              onPress={() => setModalVisible(false)}
              style={styles.modalCloseButton}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.bg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: C.onSurface,
    marginBottom: 16,
    fontFamily: "System",
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: C.onSurfaceVariant,
    letterSpacing: 0.5,
    marginBottom: 6,
    fontFamily: "System",
  },
  textInput: {
    backgroundColor: C.surfaceLow,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: C.onSurface,
    marginBottom: 16,
    fontFamily: "System",
  },
  multilineInput: {
    minHeight: 100,
    marginBottom: 0,
  },
  selectTrigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: C.surfaceLow,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  selectText: {
    fontSize: 14,
    color: C.onSurface,
    fontWeight: "500",
    fontFamily: "System",
  },
  selectIcon: {
    fontSize: 10,
    color: C.onSurfaceVariant,
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
  bottomSaveButton: {
    marginTop: 8,
    borderRadius: 999,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(11, 28, 48, 0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: C.surfaceLowest,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: C.onSurface,
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "System",
  },
  modalOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.surfaceLow,
  },
  modalOptionSelected: {
    backgroundColor: C.surfaceLow,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  modalOptionText: {
    fontSize: 15,
    color: C.onSurface,
    fontWeight: "500",
    fontFamily: "System",
  },
  modalOptionTextSelected: {
    color: C.primary,
    fontWeight: "700",
  },
  modalCloseButton: {
    marginTop: 16,
  },
});
