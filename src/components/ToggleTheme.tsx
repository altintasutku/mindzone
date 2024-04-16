"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ToggleTheme({ className }: { className?: string }) {
  const { setTheme } = useTheme();

  const changeTheme = (string: "light" | "dark" | "system") => {
    setTheme(string);
    window.location.reload();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button
          variant="outline"
          size="icon"
          className="border border-white hover:bg-white/50"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white text-black">
        <DropdownMenuItem onClick={() => changeTheme("light")}>
          Aydınlık
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("dark")}>
          Karanlık
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("system")}>
          Otomatik / Cihaz
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
