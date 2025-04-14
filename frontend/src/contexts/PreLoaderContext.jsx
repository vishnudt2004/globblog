// Node module Imports
import { createContext, useContext, useEffect, useState } from "react";

import Center from "@/components/atoms/Center";
import { PreLoaderMini } from "@/components/atoms/PreLoader";
import VisibilityControl from "@/components/atoms/VisibilityControl";
import { setOverflowY } from "@/utils/cssUtils";

const PreLoaderContext_internal = createContext(() => {});

function PreLoaderProvider(props) {
  const { children } = props ?? {}; // * Note: avoid destructuring children directly – React might pass undefined during hot reload or rerenders, causing runtime errors

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
