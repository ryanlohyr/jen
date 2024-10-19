import { addDays } from "date-fns"; // import the addDays function from date-fns
import { z } from "zod";

export const emailPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Please use a valid email"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const stepOneSignUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  partnerFirstName: z
    .string()
    .min(1, { message: "Partner's first name is required" }),
  partnerLastName: z
    .string()
    .min(1, { message: "Partner's last name is required" }),
  planningStage: z.string().min(1, { message: "Planning stage is required" }),
  dateOfWedding: z.date().min(addDays(new Date(), 1), {
    message: "Wedding date must be in the future",
  }),
});
