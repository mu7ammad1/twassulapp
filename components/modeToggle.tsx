"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { LucideDrumstick, MoonIcon, SunIcon } from "lucide-react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme || "system");

  const themes = ["light", "dark"]
  const nextTheme = () => {
    const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setCurrentTheme(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={nextTheme}
      className="rounded-full border-none bg-stone-100 dark:bg-stone-800"
      aria-label={`Current theme: ${theme}`}
    >
      {theme === "dark" ? (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          <MoonIcon className="h-5 w-5 text-blue-500" />
        </span>
      ) : theme === "light" ? (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          <SunIcon className="h-5 w-5 text-yellow-500" />
        </span>
      ) : (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          <LucideDrumstick className="h-5 w-5 text-yellow-500" />
        </span>
      )}
    </Button>
  );
}
