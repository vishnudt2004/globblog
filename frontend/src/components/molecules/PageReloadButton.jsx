import Button from "@/components/atoms/Button";
import FAIcon from "@/components/atoms/FAIcon";

function PageReloadButton({
  children = "Reload",
  icon = "spin",
  style,
  iconPosition = "right",
  ...attr
}) {
  return (
    <Button
      icon={<FAIcon icon={icon} />}
      radius="30px"
      iconPosition={iconPosition}
      onClick={() => window.location.reload()}
      style={{
        color: "#000",
        fontFamily: "var(--font-family_medium)",
        ...style,
      }}
      {...attr}
    >
      {children}
    </Button>
  );
}

export default PageReloadButton;
