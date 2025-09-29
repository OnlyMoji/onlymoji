import React, { useCallback, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import PostComposer from "./components/PostComposer";
import PostCard from "./components/PostCard";
import { Post } from "../types/feed";
import { MOCK_POSTS } from "../data/mockPosts";

import HeaderBar from "./components/HeaderBar";
import BottomTab from "./components/BottomTab";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const handleShare = useCallback((content: string) => {
    const newPost: Post = {
      id: Math.random().toString(36).slice(2),
      author: { id: "me", username: "you", avatarEmoji: "😊" },
      createdAt: new Date().toISOString(),
      text: content,
      emojis: ["✨"],
      reactions: [],
      likes: [],
      commentsCount: 0,
      attachmentsCount: 0,
    };
    setPosts((p) => [newPost, ...p]);
  }, []);

  return (
    <View style={styles.screen}>
      <HeaderBar />
      <StatusBar style="dark" />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={posts}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <View style={{ marginBottom: 12 }}>
            <PostComposer onShare={handleShare} />
          </View>
        }
        renderItem={({ item }) => <PostCard post={item} />}
      />
      <BottomTab />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FAF7FF" },
  listContent: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
});
