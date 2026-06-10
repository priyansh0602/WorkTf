import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { C } from "./Button";

interface BadgeProps {
  label: string;
  color?: "green" | "gray" | "primary" | "red" | "orange";
  style?: ViewStyle;
}

export default function Badge({ label, color = "gray", style }: BadgeProps) {
  return (
    <View style={[styles.base, styles[color as keyof typeof styles] as ViewStyle, style]}>
      <Text style={[styles.text, styles[`text_${color}` as keyof typeof styles] as TextStyle]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: "600",
  },
  green: {
    backgroundColor: "#dcfce7",
  },
  text_green: {
    color: "#166534",
  },
  gray: {
    backgroundColor: C.secondaryContainer,
  },
  text_gray: {
    color: C.onSecondaryContainer,
  },
  primary: {
    backgroundColor: C.primaryFixed,
  },
  text_primary: {
    color: C.primary,
  },
  red: {
    backgroundColor: C.errorContainer,
  },
  text_red: {
    color: C.onErrorContainer,
  },
  orange: {
    backgroundColor: "#ffedd5",
  },
  text_orange: {
    color: "#c2410c",
  },
});
