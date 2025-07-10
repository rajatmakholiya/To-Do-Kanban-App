"use client";

import taskboardStyles from "@/styles/taskboardStyles";
import { useTheme } from "@/components/common/ThemeContext";
import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  onDragStart: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string, taskTitle: string) => void;
}

export default function TaskCard({ task, onDragStart, onEdit, onDelete }: TaskCardProps) {
  const { darkMode } = useTheme();
  const styles = taskboardStyles(darkMode);

  return (
    <div
      style={styles.taskCard}
      draggable
      onDragStart={() => onDragStart(task)}
    >
      <h4 style={styles.taskTitle}>{task.title}</h4>
      <p style={styles.taskDescription}>{task.description}</p>
      <div style={styles.taskMeta}>
        <span>Priority: {task.priority}</span>
        <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</span>
      </div>
      <div style={styles.taskActions}>
        <button style={styles.iconButton} onClick={() => onEdit(task)}>✏️</button>
        <button style={styles.iconButton} onClick={() => onDelete(task.id, task.title)}>🗑️</button>
      </div>
    </div>
  );
}
