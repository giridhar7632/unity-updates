import * as React from "react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { getReports } from "../actions";
import ReportItem from "./ReportItem";

export const metadata: Metadata = {
  title: "Reports",
};

export default async function ReportsItems() {
  const reports = await getReports();

  return (
    <main className="py-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold">Reports</h1>

        <Button asChild>
          <Link href="/report/new">Add Report</Link>
        </Button>
      </div>
      <p className="mt-4 text-neutral-500 dark:text-neutral-400">
        Here's the list of reports received!
      </p>
      <ul>
        {reports.map((report) => (
          <li key={report.id} className="mt-4">
            <ReportItem {...report} />
          </li>
        ))}
      </ul>
    </main>
  );
}
