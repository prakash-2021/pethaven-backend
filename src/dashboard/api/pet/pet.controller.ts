import { config } from "dotenv";
import { Context, Next, ParameterizedContext } from "koa";
import cloudinaryUpload from "../../../_shared/config/cloudinaryUpload";
import { responseGenerator } from "../../../_shared/config/responseGenerator";
import { AppError } from "../../../_shared/exceptions";
import { PetRequestBody } from "../../../_shared/types";
import {
  createPetService,
  deletePetService,
  getAllPetsService,
  getPetByIdService,
  updatePetService,
} from "./pet.service";

// Load env
config();

export const storeImages = async (ctx: Context, next: Next) => {
  if (!ctx.request.files || !Array.isArray(ctx.request.files))
    throw new AppError("Upload files not found", 400, true);

  const data = await Promise.all(
    ctx.request.files.map(async (file) => {
      const { secure_url, created_at } = await cloudinaryUpload(
        file.buffer,
        (process.env.CLOUDINARY_FOLDER as string) + "/pets"
      );

      return { secure_url, created_at };
    })
  );

  ctx.status = 201;
  ctx.body = responseGenerator(data);
};

// Create a new pet
export const createPet = async (ctx: ParameterizedContext<any, any>) => {
  const {
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
  } = ctx.request.body as PetRequestBody;

  const pet = await createPetService({
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
};

// Get all pets
export const getAllPets = async (ctx: ParameterizedContext<any, any>) => {
  const pets = await getAllPetsService(ctx);
  ctx.status = 200;
  ctx.body = pets;
};

// Get a single pet by ID
export const getPetById = async (ctx: ParameterizedContext<any, any>) => {
  const { petId } = ctx.params;

  if (!petId) ctx.throw(400, "Pet ID is required");

  const pet = await getPetByIdService(petId);

  if (!pet) ctx.throw(404, "Pet not found");

  ctx.status = 200;
  ctx.body = pet;
};

// Update a pet
export const updatePet = async (ctx: ParameterizedContext<any, any>) => {
  const { petId } = ctx.params;
  const {
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
  } = ctx.request.body as PetRequestBody;

  if (!petId) ctx.throw(400, "Pet ID is required");

  const updatedPet = await updatePetService(petId, {
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
};

// Delete a pet
export const deletePet = async (ctx: ParameterizedContext<any, any>) => {
  const { petId } = ctx.params;

  if (!petId) ctx.throw(400, "Pet ID is required");

  await deletePetService(petId);

  ctx.status = 200;
  ctx.body = { message: "Pet deleted successfully" };
};
