import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { C } from "../../components/ui";

interface Message {
  id: string;
  text: string;
  sender: string;
  time: string;
}

interface Conversation {
  id: string;
  contactName: string;
  messages: Message[];
}

interface ConversationViewScreenProps {
  conversation: Conversation;
  onBack: () => void;
}

export default function ConversationViewScreen({
  conversation,
  onBack,
}: ConversationViewScreenProps) {
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: String(messages.length + 1),
      text: inputText,
      sender: "agent",
      time: "Just now",
    };
    setMessages([...messages, newMsg]);
    setInputText("");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{conversation.contactName}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Messages */}
      <FlatList
        data={[...messages].reverse()}
        inverted
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isAgent = item.sender === "agent";
          return (
            <View
              style={[
                styles.messageRow,
                isAgent ? styles.rowAgent : styles.rowUser,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  isAgent ? styles.bubbleAgent : styles.bubbleUser,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    isAgent ? styles.textAgent : styles.textUser,
                  ]}
                >
                  {item.text}
                </Text>
                <Text
                  style={[
                    styles.timeText,
                    isAgent ? styles.timeAgent : styles.timeUser,
                  ]}
                >
                  {item.time}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor={C.onSurfaceVariant}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.outlineVariant,
    backgroundColor: C.surfaceLowest,
  },
  backButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  backText: {
    fontSize: 14,
    fontWeight: "600",
    color: C.primary,
    fontFamily: "System",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: C.onSurface,
    fontFamily: "System",
  },
  placeholder: {
    width: 60,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  rowAgent: {
    justifyContent: "flex-end",
  },
  rowUser: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bubbleAgent: {
    backgroundColor: C.primary,
    borderBottomRightRadius: 4,
  },
  bubbleUser: {
    backgroundColor: C.surfaceContainer,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "System",
  },
  textAgent: {
    color: C.onPrimary,
  },
  textUser: {
    color: C.onSurface,
  },
  timeText: {
    fontSize: 9,
    marginTop: 4,
    alignSelf: "flex-end",
    fontFamily: "System",
  },
  timeAgent: {
    color: C.primaryFixed,
  },
  timeUser: {
    color: C.onSurfaceVariant,
  },
  inputRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: C.outlineVariant,
    backgroundColor: C.surfaceLowest,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    backgroundColor: C.surfaceLow,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: C.onSurface,
    fontFamily: "System",
    marginRight: 12,
    borderWidth: 1,
    borderColor: C.outlineVariant,
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendText: {
    color: C.primary,
    fontWeight: "700",
    fontSize: 14,
    fontFamily: "System",
  },
});
