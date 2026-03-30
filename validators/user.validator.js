import * as z from "zod";

export const User = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(50, "Name must be less than 50 characters"),
});
