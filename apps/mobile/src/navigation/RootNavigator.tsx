import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LandingScreen } from "../screens/landing";
import { OnboardingScreen } from "../screens/onboarding";
import AppNavigator from "./AppNavigator";

export type RootStackParamList = {
  Landing: undefined;
  Onboarding: undefined;
  App: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      id="Root"
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  );
}
