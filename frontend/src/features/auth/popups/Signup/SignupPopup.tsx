import { X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogContent } from "@/components/custom/CustomDialog";
import LinkButton from "@/components/custom/LinkButton";
import { GoogleIcon } from "@/components/icons/Google";

import ToastBuilder from "@/features/notifications/ToastBuilder";

import { signInWithGoogle, signUp } from "../../components/authService";
import { emailPasswordSchema } from "../../types/auth.schema";

interface LoginPopupProps {
  openSignUpPopup: boolean;
  setOpenSignUpPopup: (open: boolean) => void;
  setCurrentAuthPopup: (currentAuth: "login" | "signup") => void;
}

const SignupPopup = ({
  openSignUpPopup,
  setOpenSignUpPopup,
  setCurrentAuthPopup,
}: LoginPopupProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof emailPasswordSchema>>({
    resolver: zodResolver(emailPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSuccess = () => {
    setSubmitError(null);
    form.reset();
    setOpenSignUpPopup(false);
    ToastBuilder.success("Welcome! :)").send();
  };

  async function onSubmit(values: z.infer<typeof emailPasswordSchema>) {
    const userResponse = await signUp(values);
    if (!userResponse.isSuccess) {
      setSubmitError(userResponse.errorMessage);
      return;
    }
    handleSuccess();
  }
  async function handleSocialLogin(socialType: "google") {
    if (socialType === "google") {
      const userResponse = await signInWithGoogle();
      if (!userResponse.isSuccess) {
        setSubmitError(userResponse.errorMessage);
        return;
      }
      handleSuccess();
    } else {
      console.log("Invalid social login type");
    }
  }

  return (
    <Dialog open={openSignUpPopup}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X
                onClick={() => {
                  setOpenSignUpPopup(false);
                }}
                className="h-4 w-4"
              />
            </div>
            <h1 className="text-3xl font-sans mx-auto">Sign Up</h1>
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
            <div>
              <div className="flex flex-col items-center">
                <Button
                  // onClick={() => {
                  //   setOpenSignUpPopup(false);
                  // }}
                  type="submit"
                  className="w-full"
                >
                  Sign Up
                </Button>
                {/* Social Logins (Disable for now, because seems complicated) */}
                <div className="flex flex-col items-center">
                  <p className="mb-2 text-gray-400">Or</p>
                  <div>
                    <Button
                      type="button"
                      onClick={() => handleSocialLogin("google")}
                      variant="ghost"
                    >
                      <GoogleIcon />
                    </Button>
                    {/* To be implemented */}
                    {/* <Button
                      type="button"
                      onClick={() => handleSocialLogin("facebook")}
                      variant="ghost"
                    >
                      <FacebookIcon />
                    </Button> */}
                  </div>
                </div>
                <div className="flex justify-center items-center mt-1">
                  <p className="mr-1">Already have an account?</p>
                  <LinkButton
                    onClick={() => {
                      setCurrentAuthPopup("login");
                    }}
                  >
                    Log In
                  </LinkButton>
                </div>
              </div>
            </div>
          </form>
        </Form>
        {submitError && <p className="text-red-500">{submitError}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default SignupPopup;
