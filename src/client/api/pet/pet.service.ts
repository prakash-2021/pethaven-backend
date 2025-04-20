import { ParameterizedContext } from "koa";
import { db } from "../../../_shared/config/prisma";

// Get all pets
export const getAllPetsService = async (
  ctx: ParameterizedContext<any, any>
) => {
  const { page = 1, pageSize = 10, search, adoptionStatus } = ctx.query;

  const pageNumber = Number(page);
  const limit = Number(pageSize);
  const skip = (pageNumber - 1) * limit;

  const filters: any = {};

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

  const [pets, totalPets] = await db.$transaction([
    db.pet.findMany({
      where: filters,
      skip,
      take: limit,
    }),
    db.pet.count({
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
};

// Get a pet by ID
export const getPetByIdService = async (petId: string) => {
  return await db.pet.findUnique({
    where: { petId },
  });
};
