import {
  // Atoms
  Button,
  FAIcon,
} from "../../config/exports";

function CheckButton({ children, check, setCheck, icon, ...attr }) {
  return (
    <Button
      type={check ? "primary" : "secondary"}
      radius="15px"
      color="var(--color)"
      icon={
        <FAIcon
          icon={!icon ? (check ? "check" : "xmark") : icon}
          style={{ paddingTop: "3px" }}
        />
      }
      iconPosition="right"
      style={{
        width: "fit-content",
        height: "30px",
        margin: "5px",
        marginTop: "10px",
        color: check ? "var(--background-color)" : "var(--color)",
      }}
      hoverStyle={{
        background: "var(--color2)",
        color: "var(--background-color)",
      }}
      onClick={() => setCheck((p) => !p)}
      {...attr}
    >
      {children}
    </Button>
  );
}

export default CheckButton;
