"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
// import { MapComponent } from "~/components/MapComponents";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("~/components/MapComponent"), {
  ssr: false,
  loading: () => <p className="text-xs text-neutral-500">Loading map...</p>,
});

const formSchema = z.object({
  lat: z.number().max(180),
  lon: z.number().max(180),
});

export default function MapInput() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lat: 18.594,
      lon: 72.307,
    },
  });

  return <MapComponent />;
}
