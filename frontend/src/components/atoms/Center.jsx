function Center({ children, ...attr }) {
  return (
    <div
      {...attr}
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        alignContent: "center",
        justifyItems: "center",
        ...attr?.style,
      }}
    >
      {children}
    </div>
  );
}

export default Center;
