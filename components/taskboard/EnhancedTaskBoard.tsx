"use client";

import { useEffect, useRef, useState } from "react";
import { Task, Status } from "@/types";
import { useTheme } from "@/components/common/ThemeContext";
import taskboardStyles from "@/styles/taskboardStyles";

import Header from "./Header";
import Footer from "./Footer";
import FiltersBar from "./FiltersBar";
import AddTaskForm from "./AddTaskForm";
import TaskColumns from "./TaskColumns";
import Toast from "./Toast";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import Sidebar from "./Sidebar";

export default function EnhancedTaskBoard() {
  const { darkMode } = useTheme();
  const styles = taskboardStyles(darkMode);

  // Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Task States
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "medium" | "high">("all");
  const [filterAssignee, setFilterAssignee] = useState("all");
  const [showAddTask, setShowAddTask] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info" as "info" | "success" | "warning" | "error",
  });
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [deleteTaskTitle, setDeleteTaskTitle] = useState("");

  const dragTask = useRef<Task | null>(null);
  const dragOverColumn = useRef<Status | null>(null);

  // ✅ Hydration-safe task initialization
  useEffect(() => {
    setTasks([
      {
        id: Date.now().toString(),
        title: "Research user needs",
        description: "Conduct user interviews and analyze survey data",
        status: Status.TODO,
        createdAt: new Date(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        priority: "high",
        assignee: "Emma Thompson",
      },
    ]);
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    const matchesAssignee = filterAssignee === "all" || task.assignee === filterAssignee;
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  const todoTasks = filteredTasks.filter((task) => task.status === Status.TODO);
  const inProgressTasks = filteredTasks.filter((task) => task.status === Status.IN_PROGRESS);
  const doneTasks = filteredTasks.filter((task) => task.status === Status.DONE);

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Header */}
      <Header />
      <main style={styles.main}>
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Enhanced Task Board</h1>
          <button style={styles.actionButton} onClick={() => setSidebarOpen(true)}>
            Open Sidebar
          </button>
        </div>

        {/* Filters */}
        <FiltersBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          filterAssignee={filterAssignee}
          setFilterAssignee={setFilterAssignee}
          assignees={["all", ...new Set(tasks.map((t) => t.assignee))]}
        />

        {/* Add Task Form */}
        {showAddTask && (
          <AddTaskForm
            onAdd={(task) => {
              setTasks((prev) => [...prev, task]);
              setShowAddTask(false);
              setToast({ visible: true, message: "Task added successfully!", type: "success" });
            }}
            onCancel={() => setShowAddTask(false)}
          />
        )}

        {/* Add Task Button */}
        <button style={{ ...styles.actionButton, marginBottom: "24px" }} onClick={() => setShowAddTask(true)}>
          + Add Task
        </button>

        {/* Task Columns */}
        <TaskColumns
          tasksByStatus={{ todo: todoTasks, inProgress: inProgressTasks, done: doneTasks }}
          onDragStart={(task) => (dragTask.current = task)}
          onDragOver={(status) => (dragOverColumn.current = status)}
          onDrop={() => {
            if (!dragTask.current || !dragOverColumn.current) {
              console.warn("Invalid drag-drop operation");
              dragTask.current = null;
              dragOverColumn.current = null;
              return;
            }

            const draggedTask = dragTask.current;
            const targetStatus = dragOverColumn.current;

            setTasks((prev) =>
              prev.map((task) =>
                task.id === draggedTask.id ? { ...task, status: targetStatus } : task
              )
            );

            dragTask.current = null;
            dragOverColumn.current = null;
          }}
          onEdit={(task) => setEditTask(task)}
          onDelete={(taskId, taskTitle) => {
            setDeleteTaskId(taskId);
            setDeleteTaskTitle(taskTitle);
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast */}
      <Toast toast={toast} onClose={() => setToast((prev) => ({ ...prev, visible: false }))} />

      {/* Delete Modal */}
      {deleteTaskId && (
        <DeleteModal
          taskId={deleteTaskId}
          taskTitle={deleteTaskTitle}
          onConfirm={(id) => {
            setTasks((prev) => prev.filter((task) => task.id !== id));
            setDeleteTaskId(null);
            setToast({ visible: true, message: "Task deleted", type: "warning" });
          }}
          onCancel={() => setDeleteTaskId(null)}
        />
      )}

      {/* Edit Modal */}
      {editTask && (
        <EditModal
          task={editTask}
          onSave={(updated) => {
            setTasks((prev) => prev.map((task) => (task.id === updated.id ? updated : task)));
            setEditTask(null);
            setToast({ visible: true, message: "Task updated", type: "success" });
          }}
          onClose={() => setEditTask(null)}
        />
      )}
    </div>
  );
}
