"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
// Use a global variable to prevent multiple PrismaClient instances in development
const globalForPrisma = global;
// Reuse existing PrismaClient or create a new one
exports.db = globalForPrisma.db || new client_1.PrismaClient();
// Store PrismaClient globally in development to avoid multiple instances
if (process.env.NODE_ENV !== "production")
    globalForPrisma.db = exports.db;
