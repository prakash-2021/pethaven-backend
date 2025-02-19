import { PrismaClient } from "@prisma/client";

// Use a global variable to prevent multiple PrismaClient instances in development
const globalForPrisma = global as unknown as { db: PrismaClient };

// Reuse existing PrismaClient or create a new one
export const db = globalForPrisma.db || new PrismaClient();

// Store PrismaClient globally in development to avoid multiple instances
if (process.env.NODE_ENV !== "production") globalForPrisma.db = db;
