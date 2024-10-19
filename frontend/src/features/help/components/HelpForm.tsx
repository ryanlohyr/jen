"use client";

import { ChevronDown } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import { z as zodSchema } from "zod";

// import type * as zodSchema from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { supportType } from "@/features/landing";
import { useApiNotifications } from "@/features/notifications/useApiNotification";

import { usePostHelpResponseMutation } from "@/services/formAPI";

export const helpFormSchema = zodSchema.object({
  details: zodSchema.string().min(1, { message: "Details are required" }),
  email: zodSchema
    .string()
    .min(1, { message: "Email is required" })
    .email("Please use a valid email"),
  supportType: zodSchema.enum(supportType, {
    errorMap: () => ({ message: "Invalid support type" }),
  }),
});

export const HelpForm = () => {
  const form = useForm<zodSchema.infer<typeof helpFormSchema>>({
    resolver: zodResolver(helpFormSchema),
    defaultValues: {
      details: "",
      email: "",
      supportType: undefined,
    },
  });
  const [submit, { isLoading, error, isSuccess }] =
    usePostHelpResponseMutation();
  function onSubmit(values: zodSchema.infer<typeof helpFormSchema>) {
    if (!helpFormSchema.safeParse(values).success) {
      return;
    }

    submit(values);
  }

  useApiNotifications({
    isSuccess,
    isError: !!error,
    error,
    successAction: () => form.reset(),
    errorMessage: "An error occured. Please try again",
    successMessage:
      "Your support ticket has been noted! We will get back to you less than 24 hours!",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full mb-2">
              <Label>
                Email <span className="text-red-400">*</span>
              </Label>
              <FormControl className="w-full">
                <Input placeholder="email@address.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supportType"
          render={({ field }) => (
            <FormItem className="w-full mb-2">
              <Label>
                Support Type <span className="text-red-400">*</span>
              </Label>
              <FormControl className="w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="w-[80vw] lg:w-[375px] xl:w-[400px] border border-gray-200 rounded-lg p-2 cursor-pointer flex justify-between"
                    data-id="menu"
                  >
                    {field.value || "Choose One"}
                    <ChevronDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[80vw] lg:w-[375px] xl:w-[400px]">
                    {supportType.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        role="menuitem"
                        className="cursor-pointer text-left text-[15px]"
                        onClick={() => {
                          field.onChange(option);
                        }}
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem className="w-full mb-4">
              <Label>
                Details <span className="text-red-400">*</span>
              </Label>
              <FormControl className="w-full flex flex-row">
                <textarea
                  className="w-full border rounded-[10px] border-gray-200 lg:w-[375px] xl:w-[400px] h-[50%]"
                  {...field}
                  placeholder="Choose from above"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLoading ? (
          <button
            type="button"
            className="flex gap-5 justify-center items-center font-worksans w-[80vw] lg:w-[375px] xl:w-[400px] p-2 bg-lunaPink border rounded-full text-white text-[15px]"
          >
            Submitting <HashLoader size={19} color="white" />
          </button>
        ) : (
          <button
            className="font-worksans w-[80vw] lg:w-[375px] xl:w-[400px] p-2 bg-lunaPink border rounded-full text-white text-[15px]"
            type="submit"
          >
            Submit
          </button>
        )}
      </form>
    </Form>
  );
};
