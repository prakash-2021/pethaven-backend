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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.updatePet = exports.getPetById = exports.getAllPets = exports.createPet = exports.storeImages = void 0;
const dotenv_1 = require("dotenv");
const cloudinaryUpload_1 = __importDefault(require("../../../_shared/config/cloudinaryUpload"));
const responseGenerator_1 = require("../../../_shared/config/responseGenerator");
const exceptions_1 = require("../../../_shared/exceptions");
const pet_service_1 = require("./pet.service");
// Load env
(0, dotenv_1.config)();
const storeImages = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ctx.request.files || !Array.isArray(ctx.request.files))
        throw new exceptions_1.AppError("Upload files not found", 400, true);
    const data = yield Promise.all(ctx.request.files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const { secure_url, created_at } = yield (0, cloudinaryUpload_1.default)(file.buffer, process.env.CLOUDINARY_FOLDER + "/pets");
        return { secure_url, created_at };
    })));
    ctx.status = 201;
    ctx.body = (0, responseGenerator_1.responseGenerator)(data);
});
exports.storeImages = storeImages;
// Create a new pet
const createPet = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, species, breed, age, gender, size, color, healthStatus, adoptionStatus, images, } = ctx.request.body;
    const pet = yield (0, pet_service_1.createPetService)({
        name,
        species,
        breed,
        age,
        gender,
        size,
        color,
        healthStatus,
        adoptionStatus,
        images,
    });
    ctx.status = 201;
    ctx.body = { message: "Pet created successfully", pet };
});
exports.createPet = createPet;
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
// Update a pet
const updatePet = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId } = ctx.params;
    const { name, species, breed, age, gender, size, color, healthStatus, adoptionStatus, images, } = ctx.request.body;
    if (!petId)
        ctx.throw(400, "Pet ID is required");
    const updatedPet = yield (0, pet_service_1.updatePetService)(petId, {
        name,
        species,
        breed,
        age,
        gender,
        size,
        color,
        healthStatus,
        adoptionStatus,
        images,
    });
    ctx.status = 200;
    ctx.body = { message: "Pet updated successfully", updatedPet };
});
exports.updatePet = updatePet;
// Delete a pet
const deletePet = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId } = ctx.params;
    if (!petId)
        ctx.throw(400, "Pet ID is required");
    yield (0, pet_service_1.deletePetService)(petId);
    ctx.status = 200;
    ctx.body = { message: "Pet deleted successfully" };
});
exports.deletePet = deletePet;
