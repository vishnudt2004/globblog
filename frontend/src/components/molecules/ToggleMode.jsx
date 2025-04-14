import ToggleButton from "@/components/atoms/ToggleButton";
import FAIcon from "@/components/atoms/FAIcon";
import { useTheme } from "@/contexts/ThemeContext";

function ToggleMode() {
  const { mode, setMode } = useTheme();

  return (
    <ToggleButton
      on={mode && mode === "light" ? false : true}
      icon={{
        off: <FAIcon icon="sun" style={{ color: "#fff" }} />,
        on: <FAIcon icon="moon" style={{ color: "#000" }} />,
      }}
      colors={{
        bg: "var(--background-color)",
        off: "#000",
        on: "#fff",
      }}
      onClick={() => setMode((p) => (p === "light" ? "dark" : "light"))}
    />
  );
}

function ToggleModeCircle(attr) {
  const { mode = "light", setMode } = useTheme();

  return (
    <FAIcon
      icon={mode === "light" ? "moon" : "sun"}
      mods=""
      {...attr}
      style={{
        width: "45px",
        height: "45px",
        display: "grid",
        placeItems: "center",
        borderRadius: "50px",
        background: "var(--color)",
        color: "var(--background-color)",
        fontSize: "1.5rem",
        cursor: "pointer",
        ...attr?.style,
      }}
      onClick={() => setMode((p) => (p === "light" ? "dark" : "light"))}
    />
  );
}

export default ToggleMode;
export { ToggleModeCircle };
