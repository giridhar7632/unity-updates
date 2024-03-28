"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import MapComponent from "~/components/MapComponent";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  lat: z.number().max(180),
  lon: z.number().max(180),
});

export default function MapInput() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lat: 51.505,
      lon: -0.09,
    },
  });

  return (
    <div className="max-4xl w-full">
      <MapComponent setValue={form.setValue} />
    </div>
  );
}
