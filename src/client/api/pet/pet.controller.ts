import { config } from "dotenv";
import { ParameterizedContext } from "koa";
import { getAllPetsService, getPetByIdService } from "./pet.service";

// Load env
config();

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
