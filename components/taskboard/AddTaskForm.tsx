"use client";

import { useState } from "react";
import taskboardStyles from "@/styles/taskboardStyles";
import { useTheme } from "@/components/common/ThemeContext";
import { Task, Status } from "@/types";

interface AddTaskFormProps {
  onAdd: (task: Task) => void;
  onCancel: () => void;
}

export default function AddTaskForm({ onAdd, onCancel }: AddTaskFormProps) {
  const { darkMode } = useTheme();
  const styles = taskboardStyles(darkMode);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [assignee, setAssignee] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: Status.TODO,
      createdAt: new Date(),
      dueDate: dueDate ? new Date(dueDate) : null,
      priority,
      assignee,
    };
    onAdd(newTask);
  };

  return (
    <div style={styles.addTaskContainer}>
      <h3 style={styles.formTitle}>Add New Task</h3>
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
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
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
        <button style={styles.cancelButton} onClick={onCancel}>Cancel</button>
        <button style={styles.submitButton} onClick={handleSubmit}>Add Task</button>
      </div>
    </div>
  );
}
