"use client";

import taskboardStyles from "@/styles/taskboardStyles";
import { useTheme } from "@/components/common/ThemeContext";
import { Task, Status } from "@/types";
import TaskCard from "./TaskCard";

interface TaskColumnsProps {
  tasksByStatus: {
    todo: Task[];
    inProgress: Task[];
    done: Task[];
  };
  onDragStart: (task: Task) => void;
  onDragOver: (status: Status) => void;
  onDrop: () => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string, taskTitle: string) => void;
}

export default function TaskColumns({
  tasksByStatus,
  onDragStart,
  onDragOver,
  onDrop,
  onEdit,
  onDelete,
}: TaskColumnsProps) {
  const { darkMode } = useTheme();
  const styles = taskboardStyles(darkMode);

  const columns = [
    { status: Status.TODO, title: "To Do", tasks: tasksByStatus.todo, style: styles.todoColumn },
    { status: Status.IN_PROGRESS, title: "In Progress", tasks: tasksByStatus.inProgress, style: styles.inProgressColumn },
    { status: Status.DONE, title: "Done", tasks: tasksByStatus.done, style: styles.doneColumn },
  ];

  return (
    <div style={styles.columnsContainer}>
      {columns.map((col) => (
        <div
          key={col.status}
          style={{ ...styles.column, ...col.style }}
          onDragOver={(e) => { e.preventDefault(); onDragOver(col.status); }}
          onDrop={onDrop}
        >
          <div style={styles.columnHeader}>{col.title}</div>
          <div style={styles.columnContent}>
            {col.tasks.length === 0 ? (
              <div style={styles.emptyState}>No tasks</div>
            ) : (
              col.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDragStart={onDragStart}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
