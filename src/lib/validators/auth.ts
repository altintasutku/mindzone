import { z } from "zod";

export const registerValidator = z.object({
  name: z.string().min(1, { message: "Adınızı giriniz" }),
  surname: z.string().min(1, { message: "Soyadınızı giriniz" }),
  email: z
    .string()
    .email({ message: "Emailinizi doğru girdiğinizden emin olun" })
    .min(1, { message: "Email adresinizi giriniz" }),
  password: z
    .string()
    .min(8, { message: "Şifreniz en az 8 karakter olmalıdır" }),
  gender: z.string().min(1, { message: "Cinsiyetinizi giriniz" }),
  age: z.string().min(1, { message: "Yaşınızı giriniz" }),
  contactType: z.string().min(1, { message: "İletişim tipinizi giriniz" }),
  phone: z.string().min(1, { message: "Telefon numaranızı giriniz" }),
  education: z.string().min(1, { message: "Eğitim durumunuzu giriniz" }),
  physicalCondition: z
    .string()
    .min(1, { message: "Fiziksel durumunuzu giriniz" }),
  chronicIllness: z.string().nullable(),
  psychologicalHistory: z.string().nullable(),
});

export type RegisterType = z.infer<typeof registerValidator>;

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginType = z.infer<typeof loginValidator>;
