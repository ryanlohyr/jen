import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

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

import { emailPasswordSchema } from "../../types/auth.schema";

interface StepTwoFormProps {
  onSubmit: (data: z.infer<typeof emailPasswordSchema>) => void;
}

const StepTwoform = ({ onSubmit }: StepTwoFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof emailPasswordSchema>>({
    resolver: zodResolver(emailPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="text-3xl font-sans ">
          One last thing and you&lsquo;re in 🔑
        </h1>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel>Email</FormLabel>
                <FormControl className="w-full">
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel>Password</FormLabel>
                <FormControl className="w-full">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (8 or more characters)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              id="terms"
            />
            <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Show Password
            </p>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Let&apos;s get started!
        </Button>
      </form>
    </Form>
  );
};

export default StepTwoform;
