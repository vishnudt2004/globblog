import Button from "@/components/atoms/Button";
import FAIcon from "@/components/atoms/FAIcon";

function SubmitButton({ children = "SUBMIT", icon, ...attr }) {
  return (
    <Button
      type_attr="submit"
      icon={icon && <FAIcon icon={icon} />}
      iconPosition="right"
      color="var(--input-color)"
      style={{
        width: "250px",
        height: "50px",
        fontWeight: "bold",
        color: "var(--color)",
        letterSpacing: 2,
      }}
      {...attr}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
