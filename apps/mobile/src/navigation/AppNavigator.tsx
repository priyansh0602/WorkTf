import React from "react";
import { Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { C } from "../components/ui";
import { DashboardScreen } from "../screens/dashboard";
import { AgentConfigScreen } from "../screens/agent-config";
import { SettingsScreen } from "../screens/settings";

import { MessagingHubScreen } from "../screens/messaging";
import { WhatsAppScreen } from "../screens/whatsapp";
import { InstagramScreen } from "../screens/instagram";
import { EmailScreen } from "../screens/email";

import { CallLogsScreen } from "../screens/call-logs";
import { ActiveCallScreen } from "../screens/active-call";

// Type definitions for navigation params
export type MessagingStackParamList = {
  MessagingHub: undefined;
  WhatsApp: undefined;
  Instagram: undefined;
  Email: undefined;
};

export type CallsStackParamList = {
  CallLogs: undefined;
  ActiveCall: undefined;
};

export type AppTabParamList = {
  Dashboard: undefined;
  Messaging: undefined;
  Calls: undefined;
  Config: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();
const MessagingStack = createStackNavigator<MessagingStackParamList>();
const CallsStack = createStackNavigator<CallsStackParamList>();

// Messaging stack nesting WhatsApp, Instagram, Email
function MessagingStackNavigator() {
  return (
    <MessagingStack.Navigator
      id="MessagingStack"
      initialRouteName="MessagingHub"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MessagingStack.Screen name="MessagingHub" component={MessagingHubScreen} />
      <MessagingStack.Screen name="WhatsApp" component={WhatsAppScreen} />
      <MessagingStack.Screen name="Instagram" component={InstagramScreen} />
      <MessagingStack.Screen name="Email" component={EmailScreen} />
    </MessagingStack.Navigator>
  );
}

// Calls stack nesting CallLogs, ActiveCall
function CallsStackNavigator() {
  return (
    <CallsStack.Navigator
      id="CallsStack"
      initialRouteName="CallLogs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <CallsStack.Screen name="CallLogs" component={CallLogsScreen} />
      <CallsStack.Screen name="ActiveCall" component={ActiveCallScreen} />
    </CallsStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      id="AppTabs"
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: C.primary,
        tabBarInactiveTintColor: C.onSurfaceVariant,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let emoji = "📊";
          if (route.name === "Dashboard") {
            emoji = "📊";
          } else if (route.name === "Messaging") {
            emoji = "💬";
          } else if (route.name === "Calls") {
            emoji = "📞";
          } else if (route.name === "Config") {
            emoji = "🛠️";
          } else if (route.name === "Settings") {
            emoji = "⚙️";
          }

          return (
            <Text style={[styles.tabIcon, { opacity: focused ? 1.0 : 0.5 }]}>
              {emoji}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Messaging" component={MessagingStackNavigator} />
      <Tab.Screen name="Calls" component={CallsStackNavigator} />
      <Tab.Screen name="Config" component={AgentConfigScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: C.surfaceLowest,
    borderTopColor: C.outlineVariant,
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontFamily: "System",
    fontSize: 11,
    fontWeight: "600",
  },
  tabIcon: {
    fontSize: 20,
  },
});
