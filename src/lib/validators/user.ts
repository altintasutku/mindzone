import { z } from "zod";

//   userDetails: {
//     Gender: "Erkek",
//     Age: "18",
//     ContactType: "0",
//     UserType: "0",
//     Phone: "532 302 6260",
//     Education: "Lisans",
//     PhysicalCondition: "Hayır",
//     ChronicIllness: "-",
//     PsychologicalHistory: "-",
//     Status: "S1",
//     WeeklyStatus: "1",
//     PerformanceTaskStep: "1",
//   },

export const userDetailsValidator = z.object({
    Gender: z.string(),
    Age: z.string(),
    ContactType: z.string(),
    UserType: z.string(),
    Phone: z.string(),
    Education: z.string(),
    PhysicalCondition: z.string(),
    ChronicIllness: z.string(),
    PsychologicalHistory: z.string(),
    Status: z.string(),
    WeeklyStatus: z.string(),
    PerformanceTaskStep: z.string(),
});

// id: z.number(),
//   code: "d6fcad0b-8002-4ad1-bbca-ad0985660928",
//   name: "Utku",
//   surname: "Altinta",
//   username: "altintasutku3",
//   email: "altintasutku3@gmail.com",
//   isActive: true,
//   isLocked: false,

//   createdOn: "2024-03-12T23:25:03.10828",
//   createdBy: 0,
//   updatedOn: "2024-03-13T14:48:11.869246",
//   updatedBy: 0,

export const userValidator = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  surname: z.string(),
  username: z.string(),
  email: z.string(),
  isActive: z.boolean(),
  isLocked: z.boolean(),
  userDetails: userDetailsValidator,
  createdOn: z.string(),
  createdBy: z.number(),
  updatedOn: z.string(),
  updatedBy: z.number(),
});

export type ZodUser = z.infer<typeof userValidator>;