import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { stepOneSignUpSchema } from "../../types/auth.schema";

interface StepOneFormProps {
  onNext: (data: z.infer<typeof stepOneSignUpSchema>) => void;
  initialData: z.infer<typeof stepOneSignUpSchema>; // Add this to receive initial data
}
const StepOneform = ({ onNext, initialData }: StepOneFormProps) => {
  const form = useForm<z.infer<typeof stepOneSignUpSchema>>({
    resolver: zodResolver(stepOneSignUpSchema),
    defaultValues: initialData,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-3">
        <h1 className="text-3xl font-sans ">
          All your favourites, all in one place
        </h1>
        <p>Save them now so you can connect later</p>
        <div className="space-y-4">
          <div className="flex space-x-5">
            <div className="basis-1/2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl className="w-full">
                      <Input type="text" placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="basis-1/2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl className="w-full">
                      <Input type="text" placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex space-x-5">
            <div className="basis-1/2">
              <FormField
                control={form.control}
                name="partnerFirstName"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel>Partner&apos;s First Name</FormLabel>
                    <FormControl className="w-full">
                      <Input type="text" placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="basis-1/2">
              <FormField
                control={form.control}
                name="partnerLastName"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel>Partner&apos;s Last Name</FormLabel>
                    <FormControl className="w-full">
                      <Input type="text" placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <FormField
              control={form.control}
              name="planningStage"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel>Where are you in the planning proccess?</FormLabel>
                  <FormControl className="w-full">
                    {/* <Input type="text" placeholder="Last name" {...field} /> */}
                    <Select
                      onValueChange={(event) => field.onChange(event)}
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Stage of planning" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="notYetEngaged">
                            Not yet engaged
                          </SelectItem>
                          <SelectItem value="exploring">
                            Newly engaged and exploring
                          </SelectItem>
                          <SelectItem value="planning">
                            Planning mode but haven&apos;t booked a venue
                          </SelectItem>
                          <SelectItem value="almostDone">
                            Almost done, just the details left
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="dateOfWedding"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel>Date of wedding</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white"
                      type="date"
                      {...field}
                      value={field?.value?.toISOString().slice(0, 10)}
                      onChange={(event) => {
                        const date = new Date(event.target.value);
                        field.onChange(date);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default StepOneform;
