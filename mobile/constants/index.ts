import { Platform } from "react-native";

export const API_URL = Platform.select({
  web: "http://localhost:3000/api",
  android: "http://10.0.2.2:3000/api",
  default: "http://localhost:3000/api",
});

export const Colors = {
  primary: "#1A73E8",
  primaryDark: "#1557B0",
  background: "#F5F7FA",
  surface: "#FFFFFF",
  text: "#1A1A2E",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  error: "#DC2626",
  success: "#16A34A",
};
