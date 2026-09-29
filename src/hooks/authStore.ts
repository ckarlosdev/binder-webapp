import { create } from "zustand";
import type { AuthUser } from "../types";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
  clearAuth: () => void;
}

const storedToken = localStorage.getItem("auth_token");
const storedRefreshToken = localStorage.getItem("refresh_token");

export const useAuthStore = create<AuthState>((set) => ({
  // token: storedToken,
  // refreshToken: storedRefreshToken,
  // isAuthenticated: !!storedToken,

  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sInN1YiI6ImNyYW1pcmV6QGhtYnJhbmR0LmNvbSIsImlhdCI6MTc5MDY5OTExMSwiZXhwIjoxNzkwNzAwMDExfQ.14HIt4N1CowI2-7K2h7gphu8UPSM-p14V--u73mmz-8",
  refreshToken:
    "89fdb4c5-c6f9-4f03-a675-f8bc4490678c.a0941090-de7a-4ac8-aa89-90624594de3e",
  isAuthenticated: true,

  user: null,
  login: (token: string, refreshToken: string) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("refresh_token", refreshToken);
    set({ token, refreshToken, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    set({ token: null, refreshToken: null, isAuthenticated: false });
  },
  setUser: (user) => set({ user }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),
}));
