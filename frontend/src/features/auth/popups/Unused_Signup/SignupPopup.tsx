import { ChevronLeft, X } from "lucide-react";
import React, { useState } from "react";
import type { z } from "zod";

import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/custom/CustomDialog";
import LinkButton from "@/components/custom/LinkButton";

import type {
  emailPasswordSchema,
  stepOneSignUpSchema,
} from "../../types/auth.schema";
import StepOneform from "./StepOneform";
import StepTwoform from "./StepTwoform";

interface SignInPopupProps {
  openSignInPopup: boolean;
  setOpenSignInPopup: (open: boolean) => void;
  setCurrentAuthPopup: (currentAuth: "login" | "signup") => void;
}
const SignupPopup = ({
  openSignInPopup,
  setOpenSignInPopup,
  setCurrentAuthPopup,
}: SignInPopupProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<
    z.infer<typeof stepOneSignUpSchema> & z.infer<typeof emailPasswordSchema>
  >({
    firstName: "",
    lastName: "",
    partnerFirstName: "",
    partnerLastName: "",
    planningStage: "",
    dateOfWedding: new Date(), // Assuming this makes sense as a default
    email: "",
    password: "",
  });

  const handleNext = (data: z.infer<typeof stepOneSignUpSchema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const handleSubmit = (data: z.infer<typeof emailPasswordSchema>) => {
    const finalData = { ...formData, ...data };

    // Send `finalData` to your backend here
  };
  return (
    <Dialog open={openSignInPopup}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <LinkButton
            onClick={() => {
              setOpenSignInPopup(false);
            }}
          >
            <X className="h-4 w-4" />
          </LinkButton>
        </div>
        {step === 2 && (
          <LinkButton
            onClick={() => {
              setStep(1);
            }}
          >
            <div className="flex">
              <ChevronLeft className="-ml-2" /> Back
            </div>
          </LinkButton>
        )}
        <p>Step {step} of 2</p>

        {step === 1 ? (
          <StepOneform onNext={handleNext} initialData={formData} />
        ) : (
          <StepTwoform onSubmit={handleSubmit} />
        )}
        <div className="flex flex-col items-center">
          {/* <Button
            onClick={() => {
              setStep(2);
            }}
            type="submit"
            className="w-full"
          >
            {step === 1 ? "Continue" : "Sign Up"}
          </Button> */}
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
      </DialogContent>
    </Dialog>
  );
};

export default SignupPopup;
