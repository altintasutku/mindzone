import { z } from "zod";

export const registerValidator = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  password: z.string(),
  gender: z.string(),
  age: z.string(),
  contactType: z.string(),
  phone: z.string(),
  education: z.string(),
  physicalCondition: z.string(),
  chronicIllness: z.string().optional(),
  psychologicalHistory: z.string().optional(),
});

export type RegisterType = z.infer<typeof registerValidator>;

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginType = z.infer<typeof loginValidator>;
