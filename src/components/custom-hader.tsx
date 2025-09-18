"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeModeToggle from "@/components/theme-mode-toggle";

export default function CustomHeader() {
  return (
    <header className="p-2 shadow flex items-center justify-between border-b">
      <SidebarTrigger />

      <ThemeModeToggle />
    </header>
  );
}
