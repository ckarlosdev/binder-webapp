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
    return (
      <div className="d-flex justify-content-center py-4">
        <Spinner />
      </div>
    );
  }

  const userName = userAuth?.fullName || "Guest";

  return (
    <header className="app-header">
      <div>
        <img className="app-header__logo" src={hmbLogo} alt="HMB logo" />
      </div>
      <div className="app-header__bar">
        <div className="app-header__left">
          <Button
            variant="outline-secondary"
            className="no-print app-header__btn"
            onClick={() => {
              window.location.href = `https://ckarlosdev.github.io/HMBrandt/`;
            }}
          >
            {"<"} Home
          </Button>
        </div>
        <div className="app-header__center">
          <h2 className="app-header__title">{children}</h2>
          {/* Usuario debajo del título en tablet/celular */}
          <div className="app-header__user d-lg-none">
            <span style={{ opacity: 0.7 }}>User: </span>
            <span className="text-dark">{userName}</span>
          </div>
        </div>
        <div className="app-header__right">
          <div className="app-header__user d-none d-lg-block">
            <span style={{ opacity: 0.7 }}>User: </span>
            <span className="text-dark">{userName}</span>
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

export default Title;
