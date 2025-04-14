import { BorderX } from "@/components/atoms/Border";

function BorderWithText({
  children,
  width = "100%",
  height = "1px",
  color = "var(--color2)",
  ...attr
}) {
  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        color,
        textWrap: "nowrap",
        ...attr?.style,
      }}
    >
      <BorderX width="50%" height="100%" color={color} />
      {children}
      <BorderX width="50%" height="100%" color={color} />
    </div>
  );
}

export default BorderWithText;
