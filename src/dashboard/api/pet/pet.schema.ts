import { AdoptionStatus, Gender } from "@prisma/client";
import { z } from "zod";

export const petSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  species: z.enum(["Dog", "Cat"], { message: "Invalid species" }),
  breed: z.string().trim().min(1, { message: "Breed is required" }),
  age: z
    .number()
    .min(0, { message: "Age must be a positive number" })
    .max(50, { message: "Age seems too high" }),
  gender: z.nativeEnum(Gender, { message: "Invalid gender" }),
  size: z.string().trim().optional(),
  color: z.string().trim().min(1, { message: "Color is required" }),
  healthStatus: z
    .string()
    .trim()
    .min(1, { message: "Health status is required" }),
  adoptionStatus: z.nativeEnum(AdoptionStatus, {
    message: "Invalid adoption status",
  }),
  images: z
    .array(z.string().url(), { message: "Invalid image URL" })
    .optional(),
});
