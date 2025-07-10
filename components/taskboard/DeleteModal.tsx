"use client";

import taskboardStyles from "@/styles/taskboardStyles";
import { useTheme } from "@/components/common/ThemeContext";
import { DeleteModalProps } from "@/types";

export default function DeleteModal({ taskId, taskTitle, onConfirm, onCancel }: DeleteModalProps) {
  const { darkMode } = useTheme();
  const styles = taskboardStyles(darkMode);

  return (
    <div style={styles.deleteModal}>
      <div style={styles.deleteModalContent}>
        <div style={styles.deleteModalHeader}>
          <h2 style={styles.deleteModalTitle}>Confirm Delete</h2>
        </div>
        <p style={styles.deleteModalMessage}>
          Are you sure you want to delete <strong>{taskTitle}</strong>?
        </p>
        <div style={styles.formActions}>
          <button style={styles.cancelButton} onClick={onCancel}>Cancel</button>
          <button
            style={styles.submitButton}
            onClick={() => onConfirm(taskId!)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
