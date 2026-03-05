import * as z from "zod";

const User = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .required("Email is required")
    .toLowerCase().trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
});
