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
exports.getPetById = exports.getAllPets = void 0;
const dotenv_1 = require("dotenv");
const pet_service_1 = require("./pet.service");
// Load env
(0, dotenv_1.config)();
// Get all pets
const getAllPets = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const pets = yield (0, pet_service_1.getAllPetsService)(ctx);
    ctx.status = 200;
    ctx.body = pets;
});
exports.getAllPets = getAllPets;
// Get a single pet by ID
const getPetById = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId } = ctx.params;
    if (!petId)
        ctx.throw(400, "Pet ID is required");
    const pet = yield (0, pet_service_1.getPetByIdService)(petId);
    if (!pet)
        ctx.throw(404, "Pet not found");
    ctx.status = 200;
    ctx.body = pet;
});
exports.getPetById = getPetById;
