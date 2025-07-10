"use client";

import { DatePickerProps } from "@/types";
import taskboardStyles from "@/styles/taskboardStyles";

export default function DatePicker({ id, value, onChange, label, darkMode }: DatePickerProps) {
  const styles = taskboardStyles(darkMode);

  return (
    <div>
      {label && <label htmlFor={id} style={styles.label}>{label}</label>}
      <input
        type="date"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={styles.input}
      />
    </div>
  );
}
