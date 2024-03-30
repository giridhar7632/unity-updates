"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Icons } from "~/components/Icons";
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
import { rmUpvote, upvoteReport } from "../actions";
import { useToast } from "~/components/ui/use-toast";

export default function ReportItem({
  id,
  lat,
  lon,
  name,
  number,
  category,
  upvotes,
  description,
  createdAt,
}) {
  const [upvoted, setUpvoted] = React.useState(false);
  const { toast } = useToast();
  async function handleUpvote() {
    try {
      setUpvoted(true);
      await upvoteReport(id);
    } catch (error) {
      setUpvoted(false);
      console.error(error);
      toast({
        title: "Failed to upvote",
        description: "Please try again later",
      });
    }
  }

  async function removeUpvote() {
    try {
      setUpvoted(false);
      await rmUpvote(id);
    } catch (error) {
      setUpvoted(true);
      console.error(error);
      toast({
        title: "Failed to remove upvote",
        description: "Please try again later",
      });
    }
  }

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
        <div className="flex w-10 items-center gap-2">
          {upvoted ? (
            <Icons.upvoted onClick={removeUpvote} className="h-6 w-6" />
          ) : (
            <Icons.upvote onClick={handleUpvote} className="h-6 w-6" />
          )}
          <span>{upvotes}</span>
        </div>
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
