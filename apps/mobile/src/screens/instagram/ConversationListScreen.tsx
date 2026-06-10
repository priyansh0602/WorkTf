import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Card, Avatar, C } from "../../components/ui";

interface Conversation {
  id: string;
  contactName: string;
  lastMessage: string;
  unread: boolean;
  time: string;
}

interface ConversationListScreenProps {
  conversations: Conversation[];
  onSelect: (id: string) => void;
}

export default function ConversationListScreen({
  conversations,
  onSelect,
}: ConversationListScreenProps) {
  return (
    <FlatList
      data={conversations}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => {
        const nameParts = item.contactName.split(" ");
        const first = nameParts[0] || "";
        const last = nameParts.slice(1).join(" ") || "";
        return (
          <Card style={styles.card} onPress={() => onSelect(item.id)}>
            <View style={styles.row}>
              <Avatar firstName={first} lastName={last} size="md" />
              <View style={styles.meta}>
                <View style={styles.topRow}>
                  <Text style={styles.name}>{item.contactName}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text
                  numberOfLines={1}
                  style={[styles.preview, item.unread && styles.unreadText]}
                >
                  {item.lastMessage}
                </Text>
              </View>
            </View>
          </Card>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 8,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  meta: {
    flex: 1,
    marginLeft: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: C.onSurface,
    fontFamily: "System",
  },
  time: {
    fontSize: 11,
    color: C.onSurfaceVariant,
    fontFamily: "System",
  },
  preview: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    fontFamily: "System",
  },
  unreadText: {
    fontWeight: "600",
    color: C.primary,
  },
});
