function SVGBackground({
  type,
  imageUrl,
  color = "var(--border-color)",
  ...attr
}) {
  return (
    <div
      {...attr}
      style={{
        width: "100%",
        height: "100%",
        position: type === "fixed" ? "fixed" : "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: color,
        WebkitMaskImage: `url(${imageUrl})`,
        maskImage: `url(${imageUrl})`,
        backgroundAttachment: "fixed",
        zIndex: -1,
        ...attr?.style,
      }}
    />
  );
}

export default SVGBackground;
