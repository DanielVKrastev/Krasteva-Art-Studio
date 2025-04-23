import { useState, useEffect } from "react";

const useAdminState = (key, initialValue) => {
  // Инициализиране на състоянието с проверка на localStorage
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return initialValue;
    }
  });

  // Запис в localStorage при промяна на състоянието
  useEffect(() => {
    if (state === null) {
      localStorage.removeItem(key); // Премахване, ако състоянието е null
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(state)); // Запис на стойността
      } catch (error) {
        console.error("Error saving to localStorage", error);
      }
    }
  }, [key, state]);

  return [state, setState];
};

export default useAdminState;
