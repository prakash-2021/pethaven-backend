"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.petSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, { message: "Name is required" }),
    species: zod_1.z.enum(["Dog", "Cat"], { message: "Invalid species" }),
    breed: zod_1.z.string().trim().min(1, { message: "Breed is required" }),
    age: zod_1.z
        .number()
        .min(0, { message: "Age must be a positive number" })
        .max(50, { message: "Age seems too high" }),
    gender: zod_1.z.nativeEnum(client_1.Gender, { message: "Invalid gender" }),
    size: zod_1.z.string().trim().optional(),
    color: zod_1.z.string().trim().min(1, { message: "Color is required" }),
    healthStatus: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Health status is required" }),
    adoptionStatus: zod_1.z.nativeEnum(client_1.AdoptionStatus, {
        message: "Invalid adoption status",
    }),
    images: zod_1.z
        .array(zod_1.z.string().url(), { message: "Invalid image URL" })
        .optional(),
});
