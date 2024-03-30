"use client";

import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { useToast } from "~/components/ui/use-toast";
import { addReport } from "~/app/actions";
import dynamic from "next/dynamic";

const MapDrawer = dynamic(() => import("~/components/MapDrawer"), {
  ssr: false,
  loading: () => <p className="text-xs text-neutral-500">Loading map...</p>,
});

const formSchema = z.object({
  lat: z.number().max(180),
  lon: z.number().max(180),
  name: z
    .string()
    .min(2, "Minimum characters are 2!")
    .max(20, "Maximum characters are 20!"),
  number: z.string().min(10).max(14),
  category: z.string(),
  description: z.string(),
});

const AddForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lat: 0,
      lon: 0,
      name: "",
      number: "",
      category: "",
      description: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addReport(values);
      toast({ description: "Your report has been submitted successfully" });
      router.push("/report");
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem submitting your report.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-4 flex flex-col space-y-3"
      >
        <Label className="text-sm">Location</Label>
        <MapDrawer setValue={form.setValue} />
        <p className="text-xs text-neutral-500">
          Show us at which location you need help
        </p>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Name</FormLabel>
              <FormControl>
                <Input placeholder="Captian marvel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Phone</FormLabel>
              <FormControl>
                <Input type="text" placeholder="(101) 800-6353" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="medicine">Medical</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="crime">Crime</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about what happened..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddForm;
