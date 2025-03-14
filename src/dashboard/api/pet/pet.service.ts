import { ParameterizedContext } from "koa";
import { db } from "../../../_shared/config/prisma";
import { PetRequestBody } from "../../../_shared/types";

// Create a new pet
export const createPetService = async (data: PetRequestBody) => {
  return await db.pet.create({ data });
};

// Get all pets
export const getAllPetsService = async (
  ctx: ParameterizedContext<any, any>
) => {
  const { page = 1, pageSize = 10 } = ctx.query; // Get pagination parameters

  const pageNumber = Number(page);
  const limit = Number(pageSize);
  const skip = (pageNumber - 1) * limit;

  const [pets, totalPets] = await db.$transaction([
    db.pet.findMany({
      skip,
      take: limit,
    }),
    db.pet.count(), // Get total count of pets
  ]);

  return { pets, meta: { pageNumber, totalPets, skip } };
};

// Get a pet by ID
export const getPetByIdService = async (petId: string) => {
  return await db.pet.findUnique({
    where: { petId },
  });
};

// Update a pet
export const updatePetService = async (petId: string, data: PetRequestBody) => {
  return await db.pet.update({
    where: { petId },
    data,
  });
};

// Delete a pet
export const deletePetService = async (petId: string) => {
  return await db.pet.delete({ where: { petId } });
};
