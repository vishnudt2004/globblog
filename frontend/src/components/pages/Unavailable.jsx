// Static Imports
import messages from "../../config/messages";

import {
  // Atoms
  BorderX,
  Center,

  // Molecules
  PageRedirectButton,

  // Templates
  HorizontallyCenteredLayout,
} from "../../config/exports";

function Unavailable() {
  const {
    UNAVAILABLE: { title, detail },
  } = messages;

  return (
    <HorizontallyCenteredLayout>
      <Center
        style={{
          textAlign: "center",
          letterSpacing: "1.4",
          lineHeight: 2,
          gap: "1rem",
        }}
      >
        <div>
          <h3>{title}</h3>
          <span>{detail}</span>
        </div>

        <BorderX />

        <PageRedirectButton icon="home" redirect="/">
          Go Back to Home
        </PageRedirectButton>
      </Center>
    </HorizontallyCenteredLayout>
  );
}

export default Unavailable;
