// Node module Imports
import { createContext, useContext, useEffect } from "react";

import {
  // Contexts
  useLocalStorage,
} from "../config/exports";

const ThemeContext_internal = createContext({
  mode: "light",
  setMode: () => {},
});

function ThemeProvider({ children }) {
  const [mode, setMode] = useLocalStorage("mode", "light");

  useEffect(() => {
    mode === "dark"
      ? document.body.classList.add("dark-mode")
      : document.body.classList.remove("dark-mode");
  }, [mode]);

  return (
    <ThemeContext_internal.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext_internal.Provider>
  );
}

const useTheme = () => useContext(ThemeContext_internal);

export default ThemeProvider;
export { useTheme };
