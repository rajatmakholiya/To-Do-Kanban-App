// /types/index.ts

export enum Status {
  TODO = "todo",
  IN_PROGRESS = "inProgress",
  DONE = "done",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  dueDate: Date | null;
  priority: "low" | "medium" | "high";
  assignee: string;
}

export interface EditModalProps {
  task: Task | null;
  onSave: (task: Task) => void;
  onClose: () => void;
}

export interface ToastProps {
  message: string;
  type: "info" | "success" | "warning" | "error";
  onClose: () => void;
}

export interface DeleteModalProps {
  taskId: string | null;
  taskTitle: string;
  onConfirm: (taskId: string) => void;
  onCancel: () => void;
}

export interface DatePickerProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  darkMode: boolean;
}
