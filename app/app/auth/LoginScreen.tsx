// LoginScreen.tsx
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: 실제 로그인 로직 연동 (API / Firebase 등)
    Alert.alert(
      "Login",
      `email: ${email}\npassword: ${"*".repeat(password.length)}`
    );
  };

  const handleGoogleLogin = async () => {
    // TODO: Google 로그인 연동
    // 예) expo-auth-session or @react-native-google-signin/google-signin
    Alert.alert("Google Login", "구글 로그인 연동 예정");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* 헤더 */}
        <Text style={styles.emoji}>😊</Text>
        <Text style={styles.title}>OnlyMoji</Text>
        <Text style={styles.subtitle}>Express without words</Text>

        {/* 입력 */}
        <View style={styles.inputWrap}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputWrap}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* 로그인 버튼 */}
        <Pressable
          style={({ pressed }) => [
            styles.primaryBtn,
            pressed && styles.pressed,
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.primaryBtnText}>Log In 🚀</Text>
        </Pressable>

        {/* 구분선 */}
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        {/* Google 버튼 하나만 */}
        <Pressable
          style={({ pressed }) => [styles.googleBtn, pressed && styles.pressed]}
          onPress={handleGoogleLogin}
        >
          <Text style={styles.googleIcon}>🟦</Text>
          <Text style={styles.googleText}>Continue with Google</Text>
        </Pressable>

        {/* 약관 문구 (옵션) */}
        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FAF7FF" },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  emoji: { fontSize: 44, marginBottom: 4 },
  title: { fontSize: 28, fontWeight: "800", color: "#111" },
  subtitle: { fontSize: 13, color: "#666", marginBottom: 8 },

  inputWrap: { width: "100%", gap: 6, marginTop: 4 },
  label: { fontSize: 12, color: "#444", marginLeft: 6 },
  input: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E2E8",
    backgroundColor: "#FFF",
    paddingHorizontal: 14,
    fontSize: 15,
  },

  primaryBtn: {
    marginTop: 6,
    width: "100%",
    height: 48,
    borderRadius: 12,
    backgroundColor: "#5B5BD6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  primaryBtnText: { color: "#FFF", fontWeight: "700", fontSize: 16 },

  dividerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 6,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#E6E2EE" },
  dividerText: { fontSize: 12, color: "#8A8696" },

  googleBtn: {
    marginTop: 2,
    width: "100%",
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E2E8",
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  googleIcon: { fontSize: 16 },
  googleText: { fontSize: 15, fontWeight: "600", color: "#111" },

  pressed: { opacity: 0.7 },
  footerText: {
    marginTop: 8,
    fontSize: 11,
    color: "#8C8C99",
    textAlign: "center",
    lineHeight: 16,
  },
});
