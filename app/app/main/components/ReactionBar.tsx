import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconButton from "./IconButton";

type Props = {
  likesCount?: number;
  commentsCount?: number;
  attachmentsCount?: number;
};

export default function ReactionBar({
  likesCount = 0,
  commentsCount = 0,
  attachmentsCount = 0,
}: Props) {
  return (
    <View style={styles.row}>
      <IconButton label={`❤️`} size="sm" />
      <View style={styles.sp} />
      <Text style={styles.meta}>{likesCount}</Text>

      <View style={{ width: 10 }} />

      <IconButton label={`💬`} size="sm" />
      <View style={styles.sp} />
      <Text style={styles.meta}>{commentsCount}</Text>

      <View style={{ width: 10 }} />

      <IconButton label={`🔗`} size="sm" />
      <View style={styles.sp} />
      <Text style={styles.meta}>{attachmentsCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 },
  sp: { width: 4 },
  meta: { fontSize: 12, color: "#666" },
});
