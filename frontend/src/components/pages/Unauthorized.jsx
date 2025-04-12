// Static Imports
import messages from "../../config/messages";

import {
  // Organisms
  ResultPage,
} from "../../config/exports";

function Unauthorized() {
  const {
    UNAUTHORIZED: { title, detail },
  } = messages;

  return (
    <>
      <ResultPage
        type="error"
        message={
          <p style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <h3>{title}</h3>
            <span>{detail}</span>
          </p>
        }
        redirectionButton={{
          name: "Go to Login",
          icon: "user-circle",
          redirect: "/login",
        }}
      />
    </>
  );
}

export default Unauthorized;
