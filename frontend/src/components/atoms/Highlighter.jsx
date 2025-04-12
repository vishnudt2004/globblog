function Highlighter({
  children,
  fancy = false,
  bgColor = fancy ? "var(--info-color)" : "var(--border-color)",
  textColor = fancy ? "#fff" : "var(--color)",
  radius = fancy ? "15px" : 0,
  padding = fancy ? "1px 10px" : "1px 5px",
  margin = "0 5px",
  ...attr
}) {
  return (
    <span
      {...attr}
      style={{
        padding,
        margin,
        display: "inline-block",
        background: bgColor,
        color: textColor,
        borderRadius: radius,
        fontSize: "0.95rem",
        ...attr.style,
      }}
    >
      {children}
    </span>
  );
}

export default Highlighter;
