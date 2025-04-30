"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPetByIdService = exports.getAllPetsService = void 0;
const prisma_1 = require("../../../_shared/config/prisma");
// Get all pets
const getAllPetsService = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, pageSize = 10, search, adoptionStatus } = ctx.query;
    const pageNumber = Number(page);
    const limit = Number(pageSize);
    const skip = (pageNumber - 1) * limit;
    const filters = {};
    if (search) {
        filters.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { breed: { contains: search, mode: "insensitive" } },
            { species: { contains: search, mode: "insensitive" } },
        ];
    }
    if (adoptionStatus) {
        filters.adoptionStatus = adoptionStatus;
    }
    const [pets, totalPets] = yield prisma_1.db.$transaction([
        prisma_1.db.pet.findMany({
            where: filters,
            skip,
            take: limit,
        }),
        prisma_1.db.pet.count({
            where: filters,
        }),
    ]);
    return {
        pets,
        meta: {
            pageNumber,
            totalPets,
            pageSize: limit,
            totalPages: Math.ceil(totalPets / limit),
        },
    };
});
exports.getAllPetsService = getAllPetsService;
// Get a pet by ID
const getPetByIdService = (petId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.pet.findUnique({
        where: { petId },
    });
});
exports.getPetByIdService = getPetByIdService;
