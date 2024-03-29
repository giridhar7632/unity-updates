import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function ReportItem({
  lat,
  lon,
  name,
  number,
  category,
  description,
  createdAt,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          added {formatDistanceToNow(createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm">Contact: {number}</p>
        <div>{description}</div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Badge variant="outline">{category}</Badge>
        <Button variant="ghost" className="text-sm" asChild>
          <Link
            target="_blank"
            href={`https://maps.google.com/maps?q=${lat},${lon}`}
          >
            View location
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
