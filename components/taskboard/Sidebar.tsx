"use client";

import { useTheme } from "@/components/common/ThemeContext";
import taskboardStyles from "@/styles/taskboardStyles";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ sidebarOpen, toggleSidebar }: SidebarProps) {
  const { darkMode } = useTheme();
  const styles = taskboardStyles(darkMode);

  return (
    <aside
      style={{
        ...styles.sidebar,
        ...(sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed),
      }}
    >
      <div style={styles.sidebarHeader}>
        <h2 style={styles.sidebarTitle}>Menu</h2>
        <button onClick={toggleSidebar} style={styles.closeButton}>
          ✖
        </button>
      </div>
      <nav style={styles.sidebarNav}>
        <a href="#" style={styles.sidebarLink}>
          Dashboard
        </a>
        <a href="#" style={styles.sidebarLink}>
          Settings
        </a>
        <a href="#" style={styles.sidebarLink}>
          Support
        </a>
      </nav>
    </aside>
  );
}
