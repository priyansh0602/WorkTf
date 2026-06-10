import React from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { C } from "./Button";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  padding?: number;
}

export default function Card({ children, style, onPress, padding }: CardProps) {
  const containerStyle: ViewStyle[] = [styles.base];
  if (padding !== undefined) {
    containerStyle.push({ padding });
  }
  if (style) {
    containerStyle.push(style);
  }

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={containerStyle}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: C.surfaceLowest,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    padding: 16,
  },
});
