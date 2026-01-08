import { useState } from "react";
import { useAuthStore } from "../hooks/authStore";
import { api } from "../hooks/apiConfig";
import { Button } from "react-bootstrap";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // 1. Avisar al servidor para revocar el token en la DB
      if (refreshToken) {
        await api.post("/auth/revoke", { refreshToken });
      }
    } catch (error) {
      console.error(
        "Error al revocar token, cerrando sesión localmente...",
        error
      );
    } finally {
      logout();
      window.location.href = "https://ckarlosdev.github.io/login/";
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="outline-danger"
      style={{
        borderRadius: "10px",
        fontWeight: "bold",
        width: "100px",
        height: "40px",
      }}
    >
      {isLoading ? <span>Logging out...</span> : <>Logout</>}
    </Button>
  );
};

export default LogoutButton;
