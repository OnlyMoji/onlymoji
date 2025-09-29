import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Post } from "../../types/feed";
import ReactionBar from "./ReactionBar";

type Props = { post: Post };

export default function PostCard({ post }: Props) {
  return (
    <View style={styles.card}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.avatar}>{post.author.avatarEmoji ?? "🙂"}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.username}>{post.author.username}</Text>
          <Text style={styles.timestamp}>{timeFrom(post.createdAt)}</Text>
        </View>
        <Text style={styles.more}>⋯</Text>
      </View>

      {/* 본문 */}
      <View style={styles.body}>
        {post.emojis?.length ? (
          <Text style={styles.emojis}>{post.emojis.join(" ")}</Text>
        ) : null}
        {post.text ? <Text style={styles.text}>{post.text}</Text> : null}
        {post.imageUri ? (
          <Image source={{ uri: post.imageUri }} style={styles.image} />
        ) : null}
      </View>

      {/* 푸터 */}
      <ReactionBar
        likesCount={post.likes?.length ?? 0}
        commentsCount={post.commentsCount ?? 0}
        attachmentsCount={post.attachmentsCount ?? 0}
      />

      {/* 좋아요한 사람들 / 리액션 미니 */}
      {post.likes?.length || post.reactions?.length ? (
        <View style={styles.bottom}>
          <View style={styles.likeRow}>
            {post.likes?.slice(0, 3).map((u) => (
              <Text key={u.id} style={styles.likeAvatar}>
                {u.avatarEmoji ?? "🙂"}
              </Text>
            ))}
            {!!post.likes?.length && (
              <Text style={styles.likeText}> liked this</Text>
            )}
          </View>

          {post.reactions?.length ? (
            <View style={styles.reacts}>
              {post.reactions.map((r, i) => (
                <Text key={i} style={styles.reactEmoji}>
                  {r}
                </Text>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

function timeFrom(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.max(1, Math.round(diff / 60000));
  return `${min} minute${min > 1 ? "s" : ""} ago`;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EEE9F6",
    gap: 8,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { fontSize: 22 },
  username: { fontWeight: "700", fontSize: 14, color: "#111" },
  timestamp: { fontSize: 12, color: "#777" },
  more: { fontSize: 22, color: "#999", paddingHorizontal: 6 },

  body: { gap: 6 },
  emojis: { fontSize: 20 },
  text: { fontSize: 18, color: "#111" },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    backgroundColor: "#f2f2f7",
  },

  bottom: { marginTop: 6, gap: 6 },
  likeRow: { flexDirection: "row", alignItems: "center" },
  likeAvatar: { fontSize: 18, marginRight: 4 },
  likeText: { fontSize: 12, color: "#666" },
  reacts: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 },
  reactEmoji: { fontSize: 18 },
});
