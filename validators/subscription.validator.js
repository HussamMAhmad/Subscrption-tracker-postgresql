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
  name: z
    .string()
    .max(100, "Name must be less than 100 characters")
    .min(2, "Name must be at least 2 characters"),
  price: z.number().positive("Price must be a positive number"),
  currency: CurrencyEnum.default("USD"),
  frequency: FrequencyEnum,
  category: CategoryEnum,
  paymentMethod: PaymentMethodEnum,
  status: StatusEnum.default("ACTIVE"),
  startDate: z.coerce.date().max(new Date(), "start date must be in the past"),
});
