import React, { useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Platform,
  Keyboard,
} from "react-native";

// ===== 유틸: 커서 위치에 문자열 삽입 =====
function insertAt(input: string, insert: string, start: number, end: number) {
  return input.slice(0, start) + insert + input.slice(end);
}

// ===== 유틸: 이모지/문자 단위로 안전하게 한 글자 삭제 =====
// (간단 버전: Array.from으로 코드포인트 기준 삭제)
// 복잡한 ZWJ 시퀀스까지 완벽히 처리하려면 'graphemer' 같은 라이브러리 고려.
function deleteOneGrapheme(
  input: string,
  cursorStart: number,
  cursorEnd: number
) {
  if (cursorStart !== cursorEnd) {
    // 범위가 선택된 경우: 그 범위를 지운다.
    return {
      nextText: input.slice(0, cursorStart) + input.slice(cursorEnd),
      nextCursor: cursorStart,
    };
  }
  if (cursorStart <= 0) return { nextText: input, nextCursor: cursorStart };

  const left = input.slice(0, cursorStart);
  const right = input.slice(cursorStart);

  const units = Array.from(left); // 코드포인트 단위
  units.pop(); // 마지막 1개 제거

  const nextText = units.join("") + right;
  const nextCursor = Array.from(units).join("").length;
  return { nextText, nextCursor };
}

// ===== 커스텀 이모지 키보드 =====
type EmojiKeyboardProps = {
  onInsert: (emoji: string) => void;
  onBackspace: () => void;
  onClose: () => void;
};

const EMOJI_SET = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😊",
  "😍",
  "😘",
  "🥰",
  "😎",
  "🤩",
  "🤔",
  "😴",
  "😭",
  "😡",
  "👍",
  "👎",
  "🙏",
  "👏",
  "🔥",
  "✨",
  "🎉",
  "💯",
  "✅",
  "❌",
  "⚽",
  "🏀",
  "🍕",
  "🍔",
  "🍟",
  "🍜",
  "☕",
  "🍺",
  "🌟",
  "🌈",
  "🌙",
  "☀️",
  "🌧️",
  "⛄",
  "🚗",
  "✈️",
];

function EmojiKeyboard({ onInsert, onBackspace, onClose }: EmojiKeyboardProps) {
  return (
    <View style={styles.kbContainer}>
      <View style={styles.kbHeader}>
        <Text style={styles.kbTitle}>이모지 키보드</Text>
        <Pressable style={styles.kbClose} onPress={onClose}>
          <Text style={{ fontSize: 16 }}>닫기</Text>
        </Pressable>
      </View>

      <FlatList
        contentContainerStyle={styles.kbGrid}
        data={EMOJI_SET}
        keyExtractor={(item, idx) => `${item}-${idx}`}
        numColumns={8}
        renderItem={({ item }) => (
          <Pressable style={styles.kbKey} onPress={() => onInsert(item)}>
            <Text style={styles.kbEmoji}>{item}</Text>
          </Pressable>
        )}
      />

      <View style={styles.kbBottomRow}>
        <Pressable style={styles.kbBackspace} onPress={onBackspace}>
          <Text style={{ fontSize: 16 }}>⌫ 지우기</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ===== 화면 =====
export default function TestScreen() {
  const inputRef = useRef<TextInput>(null);

  const [value, setValue] = useState("");
  const [selection, setSelection] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });
  const [openKB, setOpenKB] = useState(false);

  // 한글/영문 등 비이모지 입력을 방지하고 싶다면, onChangeText에서 필터링(옵션)
  const filterNonEmoji = useMemo(
    () => (text: string) => {
      // 간단 필터: 공백 허용 X, 대부분 이모지/기호만 통과시키도록 예시
      // 필요하다면 정교한 정규식/화이트리스트로 커스터마이즈
      const allowed = Array.from(text).filter((ch) => {
        // 이모지 후보: 크게 제한하지 않고, 일반 알파벳/숫자/한글만 제외하는 방식
        const code = ch.codePointAt(0) ?? 0;
        const isAsciiLetterOrDigit =
          (code >= 48 && code <= 57) || // 0-9
          (code >= 65 && code <= 90) || // A-Z
          (code >= 97 && code <= 122); // a-z
        const isHangul =
          (code >= 0xac00 && code <= 0xd7a3) ||
          (code >= 0x1100 && code <= 0x11ff);
        return !(isAsciiLetterOrDigit || isHangul);
      });
      return allowed.join("");
    },
    []
  );

  const handleFocus = () => {
    // 시스템 키보드 숨김(안드로이드에 특히 효과적)
    if (Platform.OS === "android") Keyboard.dismiss();
    setOpenKB(true);
  };

  const handleInsert = (emoji: string) => {
    const next = insertAt(value, emoji, selection.start, selection.end);
    const nextCursor = selection.start + Array.from(emoji).length;
    setValue(next);
    setSelection({ start: nextCursor, end: nextCursor });
    // 포커스 유지
    inputRef.current?.focus();
  };

  const handleBackspace = () => {
    const { nextText, nextCursor } = deleteOneGrapheme(
      value,
      selection.start,
      selection.end
    );
    setValue(nextText);
    setSelection({ start: nextCursor, end: nextCursor });
    inputRef.current?.focus();
  };

  const handleClose = () => {
    setOpenKB(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이모지 전용 입력</Text>

      {/* 입력 영역 */}
      <Pressable
        style={styles.inputWrapper}
        onPress={() => {
          // 입력 영역 아무 곳이나 눌러도 포커스 + 커스텀 키보드
          inputRef.current?.focus();
          setOpenKB(true);
        }}
      >
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          placeholder="여기에 이모지만 입력됩니다"
          // ✅ 시스템 키보드 차단
          showSoftInputOnFocus={false}
          // iOS에서 시스템 키보드 올라오는 경우 방지용(보조)
          onFocus={handleFocus}
          // 시스템 키보드로 바뀐 텍스트가 들어와도 필터링
          onChangeText={(t) => setValue(filterNonEmoji(t))}
          selection={selection}
          onSelectionChange={(e) => setSelection(e.nativeEvent.selection)}
        />
      </Pressable>

      {/* 바깥 영역 누르면 키보드 닫기 */}
      {openKB && (
        <Pressable style={styles.overlay} onPress={handleClose}>
          <View />
        </Pressable>
      )}

      {/* 커스텀 이모지 키보드 */}
      {openKB && (
        <View style={styles.kbWrapper} pointerEvents="box-none">
          <EmojiKeyboard
            onInsert={handleInsert}
            onBackspace={handleBackspace}
            onClose={handleClose}
          />
        </View>
      )}
    </View>
  );
}

// ===== 스타일 =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0f",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 72,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 16,
  },
  inputWrapper: {
    width: "90%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3a3a44",
    backgroundColor: "#15151b",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    color: "#fff",
    fontSize: 18,
    minHeight: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    height: "60%",
  },
  kbWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  kbContainer: {
    backgroundColor: "#1c1c24",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 16,
    elevation: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -4 },
  },
  kbHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a33",
  },
  kbTitle: {
    color: "#fff",
    fontSize: 16,
  },
  kbClose: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#2a2a33",
    borderRadius: 8,
  },
  kbGrid: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  kbKey: {
    width: "12.5%", // 8열
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },
  kbEmoji: {
    fontSize: 26,
  },
  kbBottomRow: {
    paddingHorizontal: 14,
    paddingTop: 4,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  kbBackspace: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#2a2a33",
    borderRadius: 8,
  },
});
