import { Post } from "../types/feed";

export const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    author: { id: "u2", username: "unicorn_lover", avatarEmoji: "🦄" },
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2분 전
    emojis: ["🌈", "🦄", "✨", "⭐"],
    text: "Good morning everyone!",
    reactions: ["🤣", "❤️"],
    likes: [
      { id: "a", username: "cat", avatarEmoji: "🐱" },
      { id: "b", username: "koala", avatarEmoji: "🐨" },
      { id: "c", username: "dog", avatarEmoji: "🐶" },
    ],
    commentsCount: 2,
    attachmentsCount: 1,
  },
];
