import {
  // Atoms
  BorderX,
  Center,
  FAIcon,

  // Templates
  HorizontallyCenteredLayout,

  // Molecules
  PageRedirectButton,
} from "../../config/exports";

function ResultPage({ type, message, redirectionButton }) {
  return (
    <HorizontallyCenteredLayout>
      <Center style={{ gap: "3rem" }}>
        {type === "success" ? (
          <FAIcon
            icon="check-circle"
            style={{ color: "var(--success-color)" }}
            mods="4x"
          />
        ) : (
          <FAIcon
            icon="xmark-circle"
            style={{ color: "var(--error-color)" }}
            mods="4x"
          />
        )}

        <p
          style={{
            textAlign: "center",
            fontSize: "1.3rem",
            letterSpacing: 1.5,
          }}
        >
          {message}
        </p>

        <BorderX width="80%" />

        {redirectionButton && (
          <PageRedirectButton
            icon={redirectionButton?.icon}
            redirect={redirectionButton?.redirect}
          >
            {redirectionButton.name}
          </PageRedirectButton>
        )}
      </Center>
    </HorizontallyCenteredLayout>
  );
}

export default ResultPage;
