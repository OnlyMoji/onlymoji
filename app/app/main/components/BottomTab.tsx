import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const tabs = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "explore", icon: "🔍", label: "Explore" },
  { id: "create", icon: "➕", label: "Create" },
  { id: "messages", icon: "💬", label: "Messages" },
  { id: "profile", icon: "👤", label: "Profile" },
];

export default function BottomTab({
  onSelect,
}: {
  onSelect?: (id: string) => void;
}) {
  return (
    <View style={styles.container}>
      {tabs.map((t) => (
        <TouchableOpacity
          key={t.id}
          style={styles.tab}
          onPress={() => onSelect?.(t.id)}
        >
          <Text style={styles.icon}>{t.icon}</Text>
          <Text style={styles.label}>{t.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEE9F6",
    backgroundColor: "#FFF",
    paddingBottom: 10,
  },
  tab: { alignItems: "center", justifyContent: "center", gap: 2 },
  icon: { fontSize: 20 },
  label: { fontSize: 11, color: "#333" },
});
