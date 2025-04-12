// Node module Imports
import { useEffect, useRef } from "react";

function useInterval(callback, delay, execute) {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function func() {
      callbackRef.current();
    }
    if (delay !== null && execute) {
      let interval = setInterval(func, delay);
      return () => clearInterval(interval);
    }
  }, [delay, execute]);
}

export default useInterval;
