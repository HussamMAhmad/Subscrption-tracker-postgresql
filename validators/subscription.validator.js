import * as z from "zod";

const CurrencyEnum = z.enum(["USD", "EUR", "GBP"]);
const CategoryEnum = z.enum([
  "ENTERTAINMENT",
  "SPORTS",
  "NEWS",
  "POLITICS",
  "TECHNOLOGY",
  "LIFESTYLE",
  "OTHER",
]);
const FrequencyEnum = z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]);
const StatusEnum = z.enum(["ACTIVE", "EXPIRED", "CANCELED"]);
const PaymentMethodEnum = z.enum(["APPLEPAY", "MASTERCARD", "VISA", "PAYPAL"]);

export const SubValidator = z.object({
  id: z.string().cuid(),
  name: z
    .string()
    .max(100, "Name must be less than 100 characters")
    .min(2, "Name is required")
    .max(50, "too long")
    .required("Name is required"),
  price: z
    .number()
    .int()
    .positive("Price must be a positive number")
    .required("Price is required"),
  currency: CurrencyEnum.string()
    .required("Currency is required")
    .default("USD"),
  frequency: FrequencyEnum.string(),
  category: CategoryEnum.string().required(),
  paymentmethod: PaymentMethodEnum.required().string(),
  status: StatusEnum.string().default("active"),
  startdate: z.coerce
    .date()
    .max(new Date(), "start date must be in the past")
    .required(),
});
