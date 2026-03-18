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
  //   "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sInN1YiI6ImNyYW1pcmV6QGhtYnJhbmR0LmNvbSIsImlhdCI6MTc3Mzg2MzY3NiwiZXhwIjoxNzczODY0NTc2fQ.si4I-gRmlsRvj10AskgjmFYsjwLooEtFYSj6gq1voL0",
  // refreshToken:
  //   "ad923901-b306-4688-90d4-5ceeae50c120.a1fd6d37-54a3-4959-a02e-df750303b818",
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
