"use client";

import { ThemeProvider } from "@/components/common/ThemeContext";
import EnhancedTaskBoard from "@/components/taskboard/EnhancedTaskBoard";


export default function Page() {
  return (
    <ThemeProvider>
      <EnhancedTaskBoard />
    </ThemeProvider>
  );
}
