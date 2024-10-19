import { z } from "zod";

export const startedFormSchema = z.object({
  name: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Please use a valid email"),
  marryDate: z.string().optional(),
  whyLuna: z.string().optional(),
  canInform: z.boolean(),
});
