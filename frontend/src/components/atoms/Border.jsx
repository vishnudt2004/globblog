function Border({
  width,
  height,
  color = "var(--border-color)",
  radius = 0,
  ...attr
}) {
  const style = {
    width,
    height,
    display: "inline-block",
    background: color,
    borderRadius: radius,
    ...attr?.style,
  };

  return <div {...attr} style={style} />;
}

function BorderX({ width = "50%", height = "1px", ...attr }) {
  return <Border width={width} height={height} {...attr} />;
}

function BorderY({ width = "2px", height = "50vh", ...attr }) {
  return <Border width={width} height={height} {...attr} />;
}

export default Border;
export { BorderX, BorderY };
