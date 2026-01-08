import { create } from "zustand";

interface AuthState {
  token: string | null;
  refreshToken?: string | null;
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("auth_token"),
  isAuthenticated: !!localStorage.getItem("auth_token"),


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
