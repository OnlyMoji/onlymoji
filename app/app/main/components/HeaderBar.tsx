import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HeaderBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>EmojiGram</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={styles.icon}>💜</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={styles.icon}>✉️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE9F6",
  },
  logo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  actions: { flexDirection: "row", gap: 14 },
  iconBtn: { padding: 6 },
  icon: { fontSize: 20 },
});
