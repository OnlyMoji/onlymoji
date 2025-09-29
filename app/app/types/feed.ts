export type User = {
  id: string;
  username: string;
  avatarEmoji?: string; // 간단히 이모지로 아바타
};

export type Post = {
  id: string;
  author: User;
  createdAt: string; // ISO string
  text?: string;
  emojis?: string[]; // 본문 앞 이모지들
  imageUri?: string; // 필요 시
  reactions?: string[]; // 😆❤️ 같은 리액션 모음
  likes?: User[]; // 좋아요한 유저
  commentsCount?: number;
  attachmentsCount?: number;
};
