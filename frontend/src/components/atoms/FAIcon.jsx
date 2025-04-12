function FAIcon({ type = "solid", icon, mods = "sm", children, ...attr }) {
  const iconType = `fa-${type}`;
  const iconName = `fa-${icon || children}`;
  const modifications =
    mods &&
    mods
      .split(" ")
      .map((modification) => `fa-${modification}`)
      .join(" ");

  return (
    <i
      {...attr}
      className={`${iconType} ${iconName} ${modifications} ${attr?.className}`}
      // style={{ fontSize: "0.8rem", ...attr?.style }}
    />
  );
}

export default FAIcon;
