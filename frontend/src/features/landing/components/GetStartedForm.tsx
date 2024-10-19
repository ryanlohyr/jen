"use client";

import React from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useApiNotifications } from "@/features/notifications/useApiNotification";

import { usePostWaitingListResponseMutation } from "@/services/formAPI";

import { startedFormSchema } from "../types/started.schema";

export const GetStartedForm = () => {
  const form = useForm<z.infer<typeof startedFormSchema>>({
    resolver: zodResolver(startedFormSchema),
    defaultValues: {
      name: "",
      email: "",
      marryDate: "",
      whyLuna: "",
      canInform: false,
    },
  });

  const [submit, { isLoading, error, isSuccess }] =
    usePostWaitingListResponseMutation();
  function onSubmit(values: z.infer<typeof startedFormSchema>) {
    submit(values);
  }

  useApiNotifications({
    isSuccess,
    isError: !!error,
    error,
    successAction: () => form.reset(),
    errorMessage: "An error occured. Please try again",
    successMessage: "Welcome to the family!",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-y-4 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel>Name</FormLabel>
              <FormControl className="w-full">
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Email <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl className="w-full">
                <Input placeholder="email@address.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marryDate"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Estimated Wedding Date</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="For example: December 20, 2024 (or you can put 'NA' if you're still deciding)"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whyLuna"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Why Luna, or are there any features you&apos;d like to see added
                to Luna?
              </FormLabel>
              <FormControl className="">
                <Textarea
                  placeholder="I really like the feature where Luna provides all the price comparisons for vendors, allowing me to see exactly what I'm paying for."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="canInform"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-3 self-start">
              <FormControl className="">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>
                Allow us to get in touch to learn more about how Luna can best
                fit your wedding planning needs.
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="primaryPurple"
          type="submit"
          className="w-ful mt-8"
          disabled={isLoading}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
