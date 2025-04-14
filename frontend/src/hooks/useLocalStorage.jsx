// Node module Imports
import { useCallback, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error retrieving data from local storage: ", error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error("Error setting data to local storage: ", error);
      }
    },
    [key, storedValue],
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error("Error removing item from local storage: ", error);
    }
  }, [key]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
