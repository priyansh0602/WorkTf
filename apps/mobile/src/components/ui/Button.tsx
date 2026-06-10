import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

export const C = {
  bg: "#f8f9ff",
  surface: "#f8f9ff",
  surfaceLowest: "#ffffff",
  surfaceLow: "#eff4ff",
  surfaceContainer: "#e5eeff",
  surfaceHigh: "#dce9ff",
  onSurface: "#0b1c30",
  onSurfaceVariant: "#424754",
  outlineVariant: "#c2c6d6",
  outline: "#727785",
  primary: "#0058be",
  onPrimary: "#ffffff",
  primaryFixed: "#d8e2ff",
  primaryFixedDim: "#adc6ff",
  secondaryContainer: "#dae2fd",
  onSecondaryContainer: "#5c647a",
  error: "#ba1a1a",
  onError: "#ffffff",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",
  inverseSurface: "#213145",
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onPress,
  fullWidth = false,
  style,
}: ButtonProps) {
  const isButtonDisabled = disabled || loading;

  const containerStyles: ViewStyle[] = [styles.base];
  if (fullWidth) containerStyles.push(styles.fullWidth);
  containerStyles.push(styles[variant]);
  containerStyles.push(styles[size]);
  if (isButtonDisabled) containerStyles.push(styles.disabled);
  if (style) containerStyles.push(style);

  const textStyles: TextStyle[] = [styles.textBase];
  textStyles.push(styles[`text_${variant}` as keyof typeof styles] as TextStyle);
  textStyles.push(styles[`text_${size}` as keyof typeof styles] as TextStyle);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isButtonDisabled}
      style={containerStyles}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? C.onPrimary : C.primary}
          size="small"
        />
      ) : typeof children === "string" ? (
        <Text style={textStyles}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  fullWidth: {
    width: "100%",
  },
  primary: {
    backgroundColor: C.primary,
  },
  secondary: {
    backgroundColor: C.surfaceContainer,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  danger: {
    backgroundColor: C.errorContainer,
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabled: {
    opacity: 0.5,
  },
  textBase: {
    fontFamily: "System",
    fontWeight: "600",
    textAlign: "center",
  },
  text_primary: {
    color: C.onPrimary,
  },
  text_secondary: {
    color: C.primary,
  },
  text_ghost: {
    color: C.primary,
  },
  text_danger: {
    color: C.onErrorContainer,
  },
  text_sm: {
    fontSize: 13,
  },
  text_md: {
    fontSize: 15,
  },
  text_lg: {
    fontSize: 17,
  },
});
