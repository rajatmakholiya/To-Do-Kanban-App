"use client";

import taskboardStyles from "@/styles/taskboardStyles";
import { useTheme } from "@/components/common/ThemeContext";

interface FiltersBarProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  filterPriority: "all" | "low" | "medium" | "high";
  setFilterPriority: (v: "all" | "low" | "medium" | "high") => void;
  filterAssignee: string;
  setFilterAssignee: (v: string) => void;
  assignees: string[];
}

export default function FiltersBar({
  searchTerm,
  setSearchTerm,
  filterPriority,
  setFilterPriority,
  filterAssignee,
  setFilterAssignee,
  assignees,
}: FiltersBarProps) {
  const { darkMode } = useTheme();
  const styles = taskboardStyles(darkMode);

  return (
    <div style={styles.toolbar}>
      <div style={styles.filters}>
        <label style={styles.filterLabel}>Priority:</label>
        <select
          value={filterPriority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilterPriority(e.target.value as "all" | "low" | "medium" | "high")
          }
          style={styles.select}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label style={styles.filterLabel}>Assignee:</label>
        <select
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
          style={styles.select}
        >
          {assignees.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks..."
        style={styles.searchInput}
      />
    </div>
  );
}
