"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  darkMode: false,
  setDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty("--bg-color", "#1a1a1a");
      root.style.setProperty("--text-color", "#f1f1f1");
      root.style.setProperty("--card-bg", "#2d2d2d");
      root.style.setProperty("--header-bg", "#242424");
      root.style.setProperty("--footer-bg", "#242424");
      root.style.setProperty("--border-color", "#444");
      root.style.setProperty("--hover-color", "#383838");
    } else {
      root.style.setProperty("--bg-color", "#f9fafb");
      root.style.setProperty("--text-color", "#374151");
      root.style.setProperty("--card-bg", "#ffffff");
      root.style.setProperty("--header-bg", "#ffffff");
      root.style.setProperty("--footer-bg", "#f3f4f6");
      root.style.setProperty("--border-color", "#e5e7eb");
      root.style.setProperty("--hover-color", "#f3f4f6");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
