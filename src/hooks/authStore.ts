import { create } from "zustand";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // token: localStorage.getItem("auth_token"),
  // refreshToken: localStorage.getItem("refresh_token"),
  // isAuthenticated: !!localStorage.getItem("auth_token"),
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhM2EzYmI4NS04YzMzLTQ5OGYtYmI4Mi04NGI5YjA1MGExMWYiLCJlbWFpbCI6ImNyYW1pcmV6QGhtYnJhbmR0LmNvbSIsInN1YiI6ImEzYTNiYjg1LThjMzMtNDk4Zi1iYjgyLTg0YjliMDUwYTExZiIsImlhdCI6MTc2ODg0NTA4MiwiZXhwIjoxNzY4ODQ1OTgyfQ.YIMXGzoxVrdKcKx8hoE_6dKeqfJ7X0uyeb6kEyAxVug",
  refreshToken: "e7e15ab6-1ee7-4a05-9694-07b99d4e2ab8",
  isAuthenticated: true,

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
}));
