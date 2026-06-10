import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getInitials } from "../../../../../packages/shared/src/utils/formatters";
import { C } from "./Button";

interface AvatarProps {
  firstName: string;
  lastName: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const SIZES = {
  sm: 28,
  md: 36,
  lg: 48,
  xl: 64,
};

export default function Avatar({ firstName, lastName, size = "md" }: AvatarProps) {
  const diameter = SIZES[size];
  const initials = getInitials(firstName, lastName);

  return (
    <View
      style={[
        styles.base,
        {
          width: diameter,
          height: diameter,
          borderRadius: diameter / 2,
        },
      ]}
    >
      <Text style={[styles.text, { fontSize: diameter * 0.4 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: C.primaryFixed,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: C.primary,
    fontWeight: "700",
    fontFamily: "System",
  },
});
