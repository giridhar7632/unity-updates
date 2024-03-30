"use client";

import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="z-100 fixed bottom-0 w-full border-t border-border/40 bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-2xl justify-between">
        <Link className="flex flex-col items-center" href="/">
          {pathname === "/" ? (
            <Icons.homeFilled className="h-6 w-6" />
          ) : (
            <Icons.home className="h-6 w-6" />
          )}
          <div className="mt-1 text-center text-xs leading-3">Home</div>
        </Link>

        <Link className="flex flex-col items-center" href="/report">
          {pathname === "/report" ? (
            <Icons.reportFilled className="h-6 w-6" />
          ) : (
            <Icons.report className="h-6 w-6" />
          )}
          <div className="mt-1 text-center text-xs leading-3">Report</div>
        </Link>

        <Link className="flex flex-col items-center" href="/user">
          {pathname === "/user" ? (
            <Icons.userFilled className="h-6 w-6" />
          ) : (
            <Icons.user className="h-6 w-6" />
          )}
          <div className="mt-1 text-center text-xs leading-3">User</div>
        </Link>
      </nav>
    </footer>
  );
}
