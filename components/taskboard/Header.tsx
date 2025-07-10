"use client";

import { useTheme } from "@/components/common/ThemeContext";
import taskboardStyles from "@/styles/taskboardStyles";

export default function Header() {
  const { darkMode, setDarkMode } = useTheme();
  const styles = taskboardStyles(darkMode);

  return (
    <header style={styles.header}>
      <a href="#" style={styles.logo}>
        <span style={styles.logoIcon}>📋</span>
        TaskBoard Pro
      </a>

      <div style={styles.headerActions}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={styles.themeToggle}
          aria-label="Toggle theme"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
        <div style={styles.avatar}>U</div>
      </div>
    </header>
  );
}
