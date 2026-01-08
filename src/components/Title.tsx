import type { ReactNode } from "react";
import hmbLogo from "../assets/hmbLogo.png";

type Props = {
  children: ReactNode;
};

function Title({ children }: Props) {

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
      <div style={{ display: "grid", gridTemplateColumns: " 200px 1fr 200px" }}>
        <div></div>
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
        <div></div>
      </div>
    </div>
  );
}

export default Title;
