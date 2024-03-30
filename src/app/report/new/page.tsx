import * as React from "react";
import { Metadata } from "next";
import AddForm from "./add-from";

export const metadata: Metadata = {
  title: "New report",
};

export default function createReport() {
  return (
    <div className="space-y-4 py-4">
      <h1 className="text-3xl font-bold">New Report</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Enter your information to submit a report
      </p>
      <AddForm />
    </div>
  );
}
