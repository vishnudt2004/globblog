import {
  // Atoms
  Button,
  FAIcon,
} from "../../config/exports";

function Text({ children, icon, ...attr }) {
  return (
    <span
      {...attr}
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        letterSpacing: 1,
        ...attr?.style,
      }}
    >
      {children}
      {icon && <FAIcon icon={icon} />}
    </span>
  );
}

function ButtonPH({ children, icon, iconType, ...attr }) {
  return (
    <Button
      color="var(--color-2d)"
      style={{
        padding: "5px 10px 4px 10px",
        color: "var(--color)",
        pointerEvents: "none",
      }}
      hoverStyle={{}}
      icon={icon && <FAIcon type={iconType} icon={icon} />}
      iconPosition="right"
      {...attr}
    >
      {children}
    </Button>
  );
}

export default { Text, Button: ButtonPH };
