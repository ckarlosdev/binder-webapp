import type { ReactNode } from "react";
import hmbLogo from "../assets/hmbLogo.png";
import LogoutButton from "./LogoutButton";
import { useAuthStore } from "../hooks/authStore";
import useUserMe from "../hooks/useUser";
import { Button, Spinner } from "react-bootstrap";

type Props = {
  children: ReactNode;
};

function Title({ children }: Props) {
  const { isLoading: loadingUser } = useUserMe();
  const { user: userAuth } = useAuthStore();

  if (loadingUser) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        marginBottom: "10px",
      }}
    >
      <div>
        <img style={{ width: "250px" }} src={hmbLogo} alt="" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: " 300px 1fr 300px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",
            gap: "10px",
          }}
        >
          <Button
            variant="outline-secondary"
            // onClick={() => onPrint()}
            className="no-print"
            style={{
              borderRadius: "10px",
              fontWeight: "bold",
              width: "120px",
              height: "40px",
            }}
            onClick={() => {
              window.location.href = `https://ckarlosdev.github.io/HMBrandt/`;
            }}
          >
            {"<"} Back
          </Button>
        </div>
        <div>
          <h2
            style={{
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            {children}
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              fontSize: "0.85rem",
              color: "#6c757d",
              borderRight: "1px solid #dee2e6",
              paddingRight: "15px",
              fontWeight: "500",
            }}
          >
            <span style={{ opacity: 0.7 }}>User: </span>
            <span className="text-dark">{userAuth?.fullName || "Guest"}</span>
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Title;
