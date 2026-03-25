import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { Colors } from "../../constants";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.replace("/(auth)/login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {user?.name ?? "Guest"}</Text>
      <Text style={styles.text}>Home - Car List (coming soon)</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  logoutButton: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.error,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  logoutText: {
    color: Colors.error,
    fontSize: 15,
    fontWeight: "600",
  },
});
