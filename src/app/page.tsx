"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("~/components/MapComponent"), {
  ssr: false,
  loading: () => <p className="text-xs text-neutral-500">Loading map...</p>,
});

export default function HomePage() {
  return (
    <div className="mx-auto mt-4 flex w-full flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Unity Updates</h1>
      <p className="text-center text-sm">
        See dangerous regions as updated by your community in the map below
      </p>
      <MapWithNoSSR />
    </div>
  );
}
