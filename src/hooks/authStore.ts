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
  token: storedToken,
  refreshToken: storedRefreshToken,
  isAuthenticated: !!storedToken,

  // token:
  //   "",
  // refreshToken:
  //   "",
  // isAuthenticated: true,

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
