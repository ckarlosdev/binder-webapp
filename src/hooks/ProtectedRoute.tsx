import { useAuthStore } from "./authStore";
import { useEffect, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { token, refreshToken, logout } = useAuthStore();

  useEffect(() => {
    if (!token && !refreshToken) {
      logout();
      window.location.href = "https://ckarlosdev.github.io/login/";
    }
  }, [token, refreshToken]);

  if (!token && !refreshToken) return null;

  return <>{children}</>;
}
