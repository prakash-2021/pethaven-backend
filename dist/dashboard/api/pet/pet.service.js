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
exports.deletePetService = exports.updatePetService = exports.getPetByIdService = exports.getAllPetsService = exports.createPetService = void 0;
const prisma_1 = require("../../../_shared/config/prisma");
// Create a new pet
const createPetService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.pet.create({ data });
});
exports.createPetService = createPetService;
const getAllPetsService = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, pageSize = 10, search } = ctx.query;
    const pageNumber = Number(page);
    const limit = Number(pageSize);
    const skip = (pageNumber - 1) * limit;
    const searchQuery = typeof search === "string" ? search : undefined;
    const searchFilter = searchQuery
        ? {
            OR: [
                {
                    name: {
                        contains: searchQuery,
                        mode: "insensitive",
                    },
                },
                {
                    breed: {
                        contains: searchQuery,
                        mode: "insensitive",
                    },
                },
            ],
        }
        : {};
    const [pets, totalPets] = yield prisma_1.db.$transaction([
        prisma_1.db.pet.findMany({
            where: searchFilter,
            skip,
            take: limit,
        }),
        prisma_1.db.pet.count({
            where: searchFilter,
        }),
    ]);
    return {
        pets,
        meta: { pageNumber, totalPets, skip },
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
// Update a pet
const updatePetService = (petId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.pet.update({
        where: { petId },
        data,
    });
});
exports.updatePetService = updatePetService;
// Delete a pet
const deletePetService = (petId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.pet.delete({ where: { petId } });
});
exports.deletePetService = deletePetService;
