import { db } from "../../../_shared/config/prisma";
import { PetRequestBody } from "../../../_shared/types";

// Create a new pet
export const createPetService = async (data: PetRequestBody) => {
  return await db.pet.create({ data });
};

// Get all pets
export const getAllPetsService = async () => {
  return await db.pet.findMany();
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
