import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import IconButton from "./IconButton";

type Props = {
  onShare?: (content: string) => void;
};

export default function PostComposer({ onShare }: Props) {
  const [value, setValue] = useState("");

  return (
    <View style={styles.card}>
      <Text style={styles.avatar}>😊</Text>

      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Express yourself with emojis..."
          value={value}
          onChangeText={setValue}
          multiline
        />

        <View style={styles.actions}>
          <IconButton label="🙂" size="sm" />
          <IconButton label="📷" size="sm" />
          <IconButton label="🎵" size="sm" />
          <IconButton
            label="Share ✨"
            style={styles.share}
            onPress={() => {
              onShare?.(value);
              setValue("");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EEE9F6",
  },
  avatar: { fontSize: 22, alignSelf: "flex-start" },
  input: {
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E2EE",
    backgroundColor: "#FAFAFF",
    fontSize: 14,
  },
  actions: {
    marginTop: 10,
    flexDirection: "row",
    gap: 8,
  },
  share: {
    backgroundColor: "#5B5BD6",
    borderColor: "#5B5BD6",
  },
});
