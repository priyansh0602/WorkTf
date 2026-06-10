import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Button, C } from "../../components/ui";
import ConversationListScreen from "./ConversationListScreen";
import ConversationViewScreen from "./ConversationViewScreen";

const MOCK_CONVERSATIONS = [
  {
    id: "1",
    contactName: "Sarah Mitchell",
    lastMessage: "Do you have outbound capabilities?",
    unread: true,
    time: "11:20 AM",
    messages: [
      { id: "1", text: "Do you have outbound capabilities?", sender: "user", time: "11:20 AM" },
    ],
  },
];

export default function InstagramScreen() {
  const [showConversation, setShowConversation] = useState(false);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);

  const activeConv = MOCK_CONVERSATIONS.find((c) => c.id === activeConvId);

  const handleSelect = (id: string) => {
    setActiveConvId(id);
    setShowConversation(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {!showConversation ? (
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Instagram Direct</Text>
            <Button
              variant="primary"
              size="sm"
              onPress={() => alert("Campaign tool coming soon!")}
            >
              + Campaign
            </Button>
          </View>

          <ConversationListScreen
            conversations={MOCK_CONVERSATIONS}
            onSelect={handleSelect}
          />
        </View>
      ) : (
        activeConv && (
          <ConversationViewScreen
            conversation={activeConv}
            onBack={() => setShowConversation(false)}
          />
        )
      )}
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.outlineVariant,
    backgroundColor: C.surfaceLowest,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: C.onSurface,
    fontFamily: "System",
  },
});
