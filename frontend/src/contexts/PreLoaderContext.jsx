// Node module Imports
import { createContext, useContext, useEffect, useState } from "react";

import {
  // Atoms
  Center,
  PreLoaderMini,
  VisibilityControl,

  // Utilities
  setOverflowY,
} from "../config/exports";

const PreLoaderContext_internal = createContext(() => {});

function PreLoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOverflowY(loading);

    return () => setOverflowY(false);
  }, [loading]);

  return (
    <PreLoaderContext_internal.Provider value={setLoading}>
      <VisibilityControl visible={loading}>
        <Center
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            background: "var(--background-color)",
            zIndex: "var(--pre_loader-zindex)",
          }}
        >
          <PreLoaderMini />
        </Center>
      </VisibilityControl>
      {children}
    </PreLoaderContext_internal.Provider>
  );
}

const usePreLoader = () => useContext(PreLoaderContext_internal);

export default PreLoaderProvider;
export { usePreLoader };
