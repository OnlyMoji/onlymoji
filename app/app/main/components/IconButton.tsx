import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";

type Props = {
  label: string; // 버튼에 표시할 텍스트/이모지
  onPress?: () => void;
  style?: ViewStyle;
  size?: "sm" | "md";
};

export default function IconButton({
  label,
  onPress,
  style,
  size = "md",
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.btn, size === "sm" && styles.sm, style]}
    >
      <Text style={[styles.text, size === "sm" && styles.textSm]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E2EE",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  sm: { height: 32, paddingHorizontal: 10, borderRadius: 10 },
  text: { fontSize: 15, fontWeight: "600", color: "#111" },
  textSm: { fontSize: 13, fontWeight: "600" },
});
