"use client";

import taskboardStyles from "@/styles/taskboardStyles";
import { useTheme } from "@/components/common/ThemeContext";

export default function Footer() {
  const { darkMode } = useTheme();
  const styles = taskboardStyles(darkMode);

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <span style={styles.copyright}>
          &copy; {new Date().getFullYear()} TaskBoard Pro
        </span>
        <div style={styles.footerLinks}>
          <a style={styles.footerLink} href="#">Privacy</a>
          <a style={styles.footerLink} href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}
