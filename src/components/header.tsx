"use client";

import * as React from "react";
import { Icons } from "./Icons";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-provider";
import { Button } from "./ui/button";

export default function Header() {
  const pathname = usePathname();
  const path = pathname.split("/")[1];
  const capitalizedPathname =
    path && path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <header className="border-b border-border/40 bg-background/95 p-4 text-primary backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            className="p-2"
            variant="ghost"
            onClick={() => history.back()}
          >
            <Icons.chevronLeft className="h-6 w-6" />
            <span className="sr-only">Go back</span>
          </Button>

          <h1 className="text-xl font-medium tracking-tight">
            {capitalizedPathname}
          </h1>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
