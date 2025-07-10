"use client";

import { useState } from "react";
import taskboardStyles from "@/styles/taskboardStyles";
import { useTheme } from "@/components/common/ThemeContext";
import { EditModalProps, Task } from "@/types";

export default function EditModal({ task, onSave, onClose }: EditModalProps) {
  const { darkMode } = useTheme();
  const styles = taskboardStyles(darkMode);

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
  );
  const [priority, setPriority] = useState<"low" | "medium" | "high">(task?.priority || "medium");
  const [assignee, setAssignee] = useState(task?.assignee || "");

  const handleSubmit = () => {
    if (!title.trim() || !task) return;
    const updated: Task = {
      ...task,
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority,
      assignee,
    };
    onSave(updated);
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Edit Task</h2>
          <button style={styles.closeButton} onClick={onClose}>✖</button>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Title</label>
          <input style={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea style={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div style={styles.formRow}>
          <div style={styles.formRowItem}>
            <label style={styles.label}>Due Date</label>
            <input type="date" style={styles.input} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div style={styles.formRowItem}>
            <label style={styles.label}>Priority</label>
            <select
              style={styles.input}
              value={priority}
              onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Assignee</label>
          <input style={styles.input} value={assignee} onChange={(e) => setAssignee(e.target.value)} />
        </div>
        <div style={styles.formActions}>
          <button style={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button style={styles.submitButton} onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
