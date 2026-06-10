import React from "react";
import { Switch } from "react-native";
import { C } from "./Button";

interface ToggleProps {
  on: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export default function Toggle({ on, onChange, disabled = false }: ToggleProps) {
  return (
    <Switch
      value={on}
      onValueChange={onChange}
      disabled={disabled}
      trackColor={{ false: C.outlineVariant, true: C.primary }}
      thumbColor={C.surfaceLowest}
      ios_backgroundColor={C.outlineVariant}
    />
  );
}
