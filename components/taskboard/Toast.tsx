"use client";

import { useEffect } from "react";
import taskboardStyles from "@/styles/taskboardStyles";
import { useTheme } from "@/components/common/ThemeContext";

interface ToastWrapperProps {
  toast: { visible: boolean; message: string; type: "info" | "success" | "warning" | "error" };
  onClose: () => void;
}

export default function Toast({ toast, onClose }: ToastWrapperProps) {
  const { darkMode } = useTheme();
  const styles = taskboardStyles(darkMode);

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.visible, onClose]);

  if (!toast.visible) return null;

  const toastStyle =
    toast.type === "success"
      ? styles.toastSuccess
      : toast.type === "warning"
      ? styles.toastWarning
      : toast.type === "error"
      ? styles.toastError
      : styles.toastInfo;

  return (
    <div style={{ ...styles.toast, ...toastStyle }}>
      <span style={styles.toastMessage}>{toast.message}</span>
      <button onClick={onClose} style={styles.toastCloseButton}>✖</button>
    </div>
  );
}
