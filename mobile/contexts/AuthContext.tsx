import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";
import * as api from "../services/api";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (
    username: string,
    password: string,
    name: string,
    role: "buyer" | "seller"
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  async function loadStoredAuth() {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY),
      ]);
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // storage read failed, stay logged out
    } finally {
      setIsLoading(false);
    }
  }

  async function persistAuth(token: string, user: User) {
    await Promise.all([
      AsyncStorage.setItem(TOKEN_KEY, token),
      AsyncStorage.setItem(USER_KEY, JSON.stringify(user)),
    ]);
    setToken(token);
    setUser(user);
  }

  async function login(username: string, password: string) {
    const res = await api.login(username, password);
    await persistAuth(res.token, res.user);
  }

  async function signup(
    username: string,
    password: string,
    name: string,
    role: "buyer" | "seller"
  ) {
    const res = await api.register(username, password, name, role);
    await persistAuth(res.token, res.user);
  }

  async function logout() {
    await Promise.all([
      AsyncStorage.removeItem(TOKEN_KEY),
      AsyncStorage.removeItem(USER_KEY),
    ]);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
